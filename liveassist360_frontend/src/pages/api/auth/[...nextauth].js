import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import KeycloakProvider from "next-auth/providers/keycloak";
const getUserDetails = async (user) => {
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
      return responseData;
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
export default NextAuth({
  session: {
    strategy: "jwt",
  },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT_ID,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET,
      issuer: process.env.KEYCLOAK_ISSUER,
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async signIn({ account, profile }) {
      return true;
    },

    async jwt({ token, account }) {
      if (account) {
        token.providerId = account?.provider;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.providerId = token.providerId;
      let details = await getUserDetails(session.user);
      if (details) {
        session = { ...session, details };
        console.log("Session: ", session);
      }
      return session;
    },
  },
});
