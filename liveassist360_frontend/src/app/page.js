"use client";
import Navbar from "../components/Navbar";
import SectionAboutUs from "../components/SectionAboutUs";
import SectionServices from "../components/SectionServices";

import Footer from "../components/Footer";
import ChatWidget from "../components/ChatWidget";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  return (
    <div className="relative">
      <Navbar />
      {session?.details?.role === "ADMIN" ? <></> : <ChatWidget />}
      <SectionAboutUs />
      <SectionServices />

      <Footer />
    </div>
  );
}
