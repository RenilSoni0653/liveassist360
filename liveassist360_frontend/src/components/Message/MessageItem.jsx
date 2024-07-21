"use client";
import React, { useState } from "react";
import { timeStampConverter } from "../../lib/timeUtils";
import "./Message.css";

export const MessageItem = ({ message, username }) => {
  const type = message.messageType.toLowerCase();
  const self = message.username == username ? "_self" : "";

  const formatTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const time = formatTime(message.createdDateTime);

  return (
    <div className={"message_item_" + type + self}>
      {type != "server" && self == "" && (
        <span className="message_item_username text-xs">
          {message.username.split(" ")[0]}
        </span>
      )}
      <div className={"message_content_" + type + self}>
        <span className="message_content_value">{message.content}</span>
        <span className="text-xs">{time}</span>
      </div>
    </div>
  );
};
