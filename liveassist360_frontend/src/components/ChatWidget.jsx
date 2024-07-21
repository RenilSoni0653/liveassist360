import React, { useState, useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import ChatPopUp from "./ChatPopUp";
import Link from "next/link";

function ChatWidget() {
  const [isChatPanelDisplayed, setIsChatPanelDisplayed] = useState(false);
  const handleSignOut = async () => {
    try {
      const userId = session.details?.userId; // Assuming user ID is accessible from session

      await fetch("http://localhost:8080/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: userId }), // Send userId in the request body as JSON
      });
    } catch (error) {
      console.error("Error updating user status:", error);
    }
    signOut(); // Sign out the user after updating status
  };
  return (
    <div className="fixed right-5 top-[350px] xs:top-[400px] md:top-[660px] lg:top-[700px] ">
      {isChatPanelDisplayed ? (
        <ChatPopUp
          toggleDisplay={() => setIsChatPanelDisplayed(!isChatPanelDisplayed)}
          handleSignOut={() => handleSignOut()}
        />
      ) : (
        <button
          onClick={() => setIsChatPanelDisplayed(!isChatPanelDisplayed)}
          className="z-100 text-white transition-transform hover:scale-110 flex flex-col shrink-0 grow-0 justify-around rounded-lg"
        >
          <div className="p-2 rounded-full border-4 border-white bg-primaryColor">
            <svg
              className="w-8 h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
        </button>
      )}
    </div>
  );
}

export default ChatWidget;
