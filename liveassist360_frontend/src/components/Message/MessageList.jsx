"use client";
import React, { useEffect, useRef, useState } from "react";
import "./Message.css";
import { MessageItem } from "./MessageItem";

export const MessageList = ({ messageList, username, roomId }) => {
  const [messageHistory, setMessageHistory] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const formatTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const fetchMessageHistory = async (roomId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/messages/${roomId}`
      );
      if (response.ok) {
        const data = await response.json();
        setMessageHistory(data);
      } else {
        console.error("Failed to fetch message history");
      }
    } catch (error) {
      console.error("Error fetching message history:", error);
    }
  };

  useEffect(() => {
    if (roomId) {
      fetchMessageHistory(roomId);
    }
  }, [roomId]);

  useEffect(() => {
    scrollToBottom(); // Scroll to bottom whenever messageList changes
  }, [messageList]);
  return (
    <div className="message_list mb-2">
      {/* Render fetched message history */}
      {messageHistory.map((msg) => (
        <div
          key={msg.id}
          className={`message_item_${
            msg.username === username ? "client" : "server"
          } my-4`}
        >
          <span className="message_item_username text-xs">
            {msg.username.split(" ")[0]}
          </span>
          <div
            className={`message_content_${
              msg.username === username ? "client" : "server"
            } `}
          >
            <span className="message_content_value">{msg.content}</span>
            <span className="message_content_timestamp text-[11px] text-[#ddd]">
              {formatTime(msg.createdDateTime)}
            </span>
          </div>
        </div>
      ))}

      {/* Render real-time messages */}
      {messageList.map((message, idx) => (
        <MessageItem
          key={idx}
          message={message}
          username={username}
          roomId={roomId}
        />
      ))}
      <div ref={messagesEndRef} className="mb-20" />
    </div>
  );
};
