import { useCallback, useEffect, useState } from "react";
import io from "socket.io-client";
import { SOCKET_BASE_URL } from "../constants/apiConstants";
import { useSession } from "next-auth/react";

export const useSocket = (roomId, username, senderId) => {
  const [socket, setSocket] = useState(null);
  const [socketResponse, setSocketResponse] = useState({
    room: "",
    content: "",
    username: "",
    messageType: "",
    createdDateTime: "",
    senderId: ""
  });
  const [isConnected, setConnected] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    if (!username || !roomId) return;

    const newSocket = io(SOCKET_BASE_URL, {
      query: {
        username: username,
        room: roomId // Use roomId here instead of username for the room
      }
    });

    newSocket.on("connect", () => {
      setConnected(true);
    });

    newSocket.on("disconnect", () => {
      setConnected(false);
    });

    newSocket.on("read_message", (res) => {
      console.log(res);
      setSocketResponse({
        room: res.room,
        content: res.content,
        username: res.username,
        messageType: res.messageType,
        createdDateTime: res.createdDateTime,
        senderId: res.senderId
      });
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [username, roomId]);

  const sendData = useCallback(
    (payload) => {
      if (!socket) return;
      socket.emit("send_message", {
        room: roomId, // Use roomId here instead of username for the room
        content: payload.content,
        username: username,
        messageType: "CLIENT",
        senderId: senderId
      });
    },
    [socket, roomId, username, senderId]
  );

  return { socketResponse, isConnected, sendData };
};
