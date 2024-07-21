import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    details: {
      email: string;
      connectionStatus: string;
      profilePicture: string;
      providerId: string;
      role: string;
      roomId: string;
      userStatus: string;
      userId: number;
      username: string;
    } & DefaultSession["user"];
  }
}
