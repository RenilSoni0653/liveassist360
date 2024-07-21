import { signIn, useSession } from "next-auth/react";
import { FaKey } from "react-icons/fa";
import { PiSignOutBold } from "react-icons/pi";
import { FcGoogle } from "react-icons/fc";
import { RiSendPlaneLine } from "react-icons/ri";
import { Message } from "./Message/Message";
import BlockUser from "./BlockUser";
import { IoClose } from "react-icons/io5";

function ChatPopUp(props) {
  const { data: session } = useSession();

  return (
    <div id="chat-container" className="fixed right-5 bottom-5 w-80">
      <div className="bg-white shadow-md rounded-lg max-w-lg w-full">
        <div className="p-4 border-b bg-blue-900 text-white rounded-t-lg flex justify-between items-center">
          <p className="text-md font-semibold">
            {session && session.user ? session.user.name : "LiveAssist360"}
          </p>
          {session?.user ? (
            <button
              id="close-chat"
              className="text-gray-300 hover:text-gray-400 focus:outline-none focus:text-gray-400"
              onClick={props.handleSignOut}
            >
              <PiSignOutBold className="text-white" size={24} />
            </button>
          ) : (
            <button
              id="close-chat"
              className="text-gray-300 hover:text-gray-400 focus:outline-none focus:text-gray-400"
              onClick={props.toggleDisplay}
            >
              <IoClose className="text-white" size={24} />
            </button>
          )}
        </div>
        <div id="chatbox" className="pt-2 overflow-y-auto">
          {session && session.user ? (
            <BlockUser>
              <Message
                room={session?.details.roomId}
                username={session.user.name}
                senderId={session?.details.userId}
              />
            </BlockUser>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <div
                type="button"
                className="pt-1"
                onClick={() => {
                  signIn("google");
                }}
              >
                <button className="bg-white text-primaryColor bg-opacity-50 flex gap-3 py-3 px-6 text-lg justify-center items-center rounded-full border border-1 shadow-md hover:cursor-pointer focus:outline-none">
                  <FaKey size={24} />
                  <span>Login via SSO</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatPopUp;
