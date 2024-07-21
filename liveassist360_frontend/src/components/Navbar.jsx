"use client";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import "./Message/Message.css";
import Logo from "./Logo";
function Navbar() {
  const { data: session } = useSession();

  const [username, setUsername] = useState("");

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

  return (
    <nav className="bg-slate shadow-xl bg-white">
      <div className="flex justify-between h-full w-full items-center p-4 gap-10 ">
        <Link href="/">
          <Logo />
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
