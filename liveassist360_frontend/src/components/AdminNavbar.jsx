import Image from "next/image";
import LiveAssist360Logo from "../assets/LiveAssist360Logo.svg";
import Link from "next/link";
import defaultUser from "../assets/defaultUser.svg";

import { signOut, signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRef } from "react";
function Navbar() {
  const dropdownRef = useRef(null);
  const { data: session } = useSession();
  const isAdmin = session?.details?.role === "ADMIN" ? true : false;
  const [username, setUsername] = useState("");
  const [isMediumScreen, setIsMediumScreen] = useState(false);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [fullScreenDrop, setFullScreenDrop] = useState(false);
  function capitalizeName(name) {
    let nameParts = name.split(" ");
    for (let i = 0; i < nameParts.length; i++) {
      nameParts[i] =
        nameParts[i].charAt(0).toUpperCase() + nameParts[i].slice(1);
    }
    return nameParts.join(" ");
  }

  useEffect(() => {
    if (session?.user) {
      setUsername(capitalizeName(session.user.name));
    } else {
      setUsername("");
    }
  }, [session]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMediumScreen(mediaQuery.matches);

    const handleResize = () => {
      setIsMediumScreen(mediaQuery.matches);
    };

    mediaQuery.addListener(handleResize);

    return () => {
      mediaQuery.removeListener(handleResize);
    };
  }, []);

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

  const toggleDropdown = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropDownOpen(false);
        setFullScreenDrop(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  return (
    <nav className="bg-slate shadow-xl bg-white">
      <div className="flex justify-between h-full w-full items-center p-4 ">
        <Link href="/admin">
          <Image
            src={LiveAssist360Logo}
            alt="LiveAssist360 Logo"
            width="300"
            height="auto"
            className="hover:cursor-pointer"
            priority={true}
          />
        </Link>
        {isMediumScreen ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="text-primaryColor font-light focus:outline-none w-12 h-12 rounded-full  ring ring-primary ring-offset-base-100 ring-offset-2"
            >
              {session && session?.details?.profilePicture ? (
                <Image
                  src={session?.details?.profilePicture}
                  width="48"
                  height="48"
                  className="rounded-full object-contain"
                  alt={session?.details?.username}
                />
              ) : (
                <Image
                  alt="user image"
                  priority={true}
                  src={defaultUser}
                  width={50}
                  height={50}
                  className="object-contain rounded-full"
                />
              )}
            </button>

            {isDropDownOpen && (
              <div className="absolute right-0 mt-1 px-4 w-36 bg-white  text-primaryColor border border-gray-200 rounded-lg shadow-lg z-30">
                {session && session.user && isAdmin ? (
                  <ul
                    className="py-1 flex flex-col items-end w-full justify-center text-md"
                    onClick={toggleDropdown}
                  >
                    <li className="w-full  text-right border-b border-1 border-gray-300">
                      <Link href="/admin">
                        <p className="block px-4 py-2 text-md hover:bg-gray-100">
                          {username.split(" ")[0]}
                        </p>
                      </Link>
                    </li>

                    <li className="w-full text-right  border-b border-1 border-gray-300">
                      <Link href="/admin/chats">
                        <p className="block px-4 py-2 hover:bg-gray-100">
                          Chats
                        </p>
                      </Link>
                    </li>
                    <li className="w-full  text-right border-b border-1 border-gray-300">
                      <Link href="/admin/dashboard">
                        <p className="block px-4 py-2 text-md hover:bg-gray-100">
                          Settings
                        </p>
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleSignOut}
                        className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
                      >
                        Sign Out
                      </button>
                    </li>
                  </ul>
                ) : (
                  <li>
                    <button
                      onClick={() => signIn("keycloak")}
                      className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
                    >
                      Admin Login
                    </button>
                  </li>
                )}
              </div>
            )}
          </div>
        ) : (
          <div>
            <ul className="text-primaryColor font-light flex gap-5">
              {session && session.user && isAdmin ? (
                <div className="flex items-center gap-5">
                  <Link
                    href="/admin/dashboard"
                    className="hover:font-normal hover:cursor-pointer"
                  >
                    <li>Settings</li>
                  </Link>
                  <Link
                    href="/admin/chats"
                    className="hover:font-normal hover:cursor-pointer"
                  >
                    <li>Chats</li>
                  </Link>
                  <div className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setFullScreenDrop(!fullScreenDrop)}
                      className="text-primaryColor font-light focus:outline-none w-12 h-12 rounded-full  ring ring-primary ring-offset-base-100 ring-offset-2"
                    >
                      <Image
                        src={session?.details?.profilePicture}
                        width="48"
                        height="48"
                        className="rounded-full object-contain"
                        alt={session?.details?.username}
                      />
                    </button>
                    {fullScreenDrop && (
                      <ul
                        onClick={toggleDropdown}
                        className="absolute right-0 mt-1 px-4 w-36 bg-white  text-primaryColor border border-gray-200 rounded-lg shadow-lg z-30"
                      >
                        <li className="block  border-b border-1 border-gray-300 px-4 py-2 hover:bg-gray-100 w-full text-right">
                          {username.split(" ")[0]}
                        </li>
                        <li>
                          <button
                            onClick={handleSignOut}
                            className="block px-4 py-2 hover:bg-gray-100 w-full text-right"
                          >
                            Sign Out
                          </button>
                        </li>
                      </ul>
                    )}
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => {
                    signIn("keycloak");
                  }}
                  className="hover:font-normal hover:cursor-pointer"
                >
                  Admin Login
                </button>
              )}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
