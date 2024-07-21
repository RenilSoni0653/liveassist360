"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import AboutUsImg from "../assets/hero.png";
import { Merriweather } from "next/font/google";
import { FaComments } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { signIn, useSession } from "next-auth/react";
import { FaKey } from "react-icons/fa";
import Link from "next/link";
import ChatWidget from "./ChatWidget";

const merriweather = Merriweather({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

function SectionAboutUs() {
  const { data: session } = useSession();
  const [userDataSent, setUserDataSent] = useState(false);
  const [loading, setLoading] = useState(false);
  let isAdmin = session?.details?.role === "ADMIN" ? true : false;
  console.log("isAdmin: ", isAdmin);
  useEffect(() => {
    if (session && session.user && !userDataSent && !loading) {
      sendUserDataToBackend(session.user);
    }
  }, [session, userDataSent, loading]);

  const sendUserDataToBackend = async (user) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/api/registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: user.name,
          email: user.email,
          profilePicture: user.image,
          providerId: user.providerId,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Data is going to backend", responseData);

        setUserDataSent(true);
      } else {
        console.error("Failed to send user data to backend");
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
  };

  return (
    <section id="aboutus h-screen">
      <div className=" grid grid-cols-1 sm:grid-cols-2 bg-gradient-to-r from-blue-400 to-indigo-500 ">
        <div className="grid grid-rows-4 ps-4 pe-4 sm:ps-5 sm:pe-5 md:ps-10 md:pe-10">
          <div className="h-auto"></div>
          <div className="flex align-top">
            <p
              className={
                "text-3xl text-center sm:text-left sm:text-5xl md:text-6xl align-middle text-white ${merriweather.className}"
              }
            >
              Buy and Sell AutoMobiles At
              <span className="inline-block  border-2 px-1 my-2  bg-white text-primaryColor rounded-lg border-white">
                Best Price
              </span>
            </p>
          </div>
          <div className="flex items-center gap-4 ">
            <div
              className={` ${
                session && session.user
                  ? "row-start-4 row-end-5"
                  : "row-start-3 row-end-4"
              }`}
            >
              {session && session.data?.role == !"ADMIN" && <ChatWidget />}
              {/* {session && session.user ? (
                <div className="items-center gap-4">
              </div>
            ) : (
              <div className="flex flex-col md:flex-row gap-2">
                <div
                  type="button"
                  className="pt-1"
                  onClick={() => {
                    signIn("google");
                  }}
                >
                  <div className=" bg-white text-primaryColor bg-opacity-50 flex gap-5 pt-3 pb-3 pl-10 pr-10 text-xl justify-center items-center rounded-full hover:cursor-pointer">
                    <FcGoogle size={22} />
                    Sign In With Google
                  </div>
                </div>
                <div
                  type="button"
                  className="pt-1"
                  onClick={() => {
                    signIn("keycloak");
                  }}
                >
                  <div className=" bg-white text-primaryColor bg-opacity-50 flex gap-5 pt-3 pb-3 px-10 text-xl justify-center items-center rounded-full hover:cursor-pointer">
                    <FaKey size={22} />
                    Sign In With Email
                  </div>
                </div>
              </div>
            )} */}
            </div>
          </div>
          <div className="h-auto"></div>
        </div>

        <div className="grid justify-center items-center">
          <Image
            alt="about us graphic"
            loading="eager"
            priority={true}
            src={AboutUsImg}
            className="hidden sm:block object-cover sm:transition-opacity sm:opacity-0 sm:duration-[0.5s] "
            onLoadingComplete={(image) =>
              image.classList.remove("sm:opacity-0")
            }
          />
        </div>
      </div>
    </section>
  );
}

export default SectionAboutUs;
