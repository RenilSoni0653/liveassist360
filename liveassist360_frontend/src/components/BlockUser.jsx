"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function BlockUser({ children }) {
  const { data: session } = useSession();
  console.log(session);
  const router = useRouter();
  if (session?.details?.userStatus == "INACTIVE") {
    return (
      <div className="flex  flex-col justify-between items-center h-full p-2 h-full">
        <h2 className="text-xl">You have been blocked by the Admin.</h2>
        <p className="text-gray-500 pb-16">
          Please contact the Admin for further details.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-start items-stretch h-100">
      {children}
    </div>
  );
}
