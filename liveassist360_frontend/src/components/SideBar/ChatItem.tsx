"use client";
import React, { useState } from "react";
import Image from "next/image";
import { triggerSocket, useSelectedUser } from "../../store/userStore";
import { useSession } from "next-auth/react";
import { Message } from "../Message/Message";
import { useSocket } from "../../customHooks/useSocket";
import { userProps } from "../../lib/types";

function ChatItem({ user }: { user: userProps }) {
  const { data: session } = useSession();
  const username = session?.user?.name;
  const userId = session?.details?.userId;
  const [showMessage, setShowMessage] = useState(false);
  const { selectedUser, setSelectedUser } = useSelectedUser((state) => ({
    setSelectedUser: state.setSelectedUser,
    selectedUser: user,
  }));

  // Initiate socket connection
  const { sendData } = useSocket();

  function handleClick() {
    setSelectedUser(user);
    console.log("selectedUser", selectedUser);
    sendData({ roomId: selectedUser.roomId, username, userId });
    setShowMessage(true);
  }

  return (
    <>
      <li
        onClick={handleClick}
        className="flex gap-4 justify-center md:justify-start cursor-pointer hover:bg-slate-300 p-5 rounded-lg"
      >
        <div className="avatar">
          <div className="w-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <Image
              src={user?.profilePicture || ""}
              width={256}
              height={256}
              className="rounded-full"
              alt={user?.username}
            />
          </div>
        </div>
        <div className="hidden sm:flex flex-col justify-center ">
          <h3 className="font-semibold text-black text-sm lg:text-lg">
            {user?.username}
          </h3>
          <p
            className={`${
              user?.connectionStatus == "ONLINE"
                ? "text-green-500"
                : "text-[#707991]"
            } text-xs lg:text-md`}
          >
            {user?.connectionStatus}
          </p>
        </div>
      </li>
      <div className="border border-1 w-100 my-2 border-gray-200"></div>
    </>
  );
}

export default ChatItem;
