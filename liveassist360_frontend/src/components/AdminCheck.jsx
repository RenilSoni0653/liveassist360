"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AuthCheck({ children }) {
  const { data: session } = useSession();
  const router = useRouter();
  if (session?.details?.role !== "ADMIN") {
    router.push("/");
    return <div></div>;
  }

  return <>{children}</>;
}
