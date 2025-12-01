import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Replace with your own authentication logic
        // if (
        //   credentials?.username === "admin" &&
        //   credentials?.password === "admin"
        // ) {
        //   return { id: "1", name: "Admin User", email: "admin@example.com" };
        // }
        // return null;

        const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

        try {
          const res = await fetch(`${BACKEND_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials?.username,
              password: credentials?.password,
            }),
          });

          const data = await res.json();

          console.log("data => ", credentials);
          console.log("data => ", data);

          if (!res.ok) {
            return null;
          }

          // Return user object with tokens
          return {
            id: "001e507e-c3cd-4351-a730-33a2a0e5634f",
            email: credentials?.username,
            accessToken: data.access_token,
            refreshToken: data.refresh_token,
          };
        } catch (error) {
          console.error("Error during authentication:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.accessToken = token.accessToken as string;
        session.user.refreshToken = token.refreshToken as string;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
