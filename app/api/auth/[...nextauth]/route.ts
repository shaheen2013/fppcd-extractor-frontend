import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

function decodeJWT(token: string) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Error decoding JWT:", error);
    return null;
  }
}

async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    const response = await fetch(`${BACKEND_URL}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        refresh_token: token.refreshToken,
      }),
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    // Decode the new access token to get expiration time
    const decoded = decodeJWT(refreshedTokens.access_token);
    const accessTokenExpires = decoded?.exp
      ? decoded.exp * 1000
      : Date.now() + 60 * 60 * 1000;

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
      accessTokenExpires,
    };
  } catch (error) {
    console.error("Error refreshing access token:", error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
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

          // Decode the access token to get expiration time
          const decoded = decodeJWT(data.access_token);
          const accessTokenExpires = decoded?.exp
            ? decoded.exp * 1000
            : Date.now() + 60 * 60 * 1000;

          // Return user object with tokens
          return {
            id: "001e507e-c3cd-4351-a730-33a2a0e5634f",
            email: credentials?.username,
            accessToken: data.access_token,
            refreshToken: data.refresh_token,
            accessTokenExpires,
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
      // Initial sign in
      if (user) {
        token.id = user.id;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;

        // Decode the access token to get expiration time
        if (user.accessToken) {
          const decoded = decodeJWT(user.accessToken);
          token.accessTokenExpires = decoded?.exp
            ? decoded.exp * 1000
            : Date.now() + 60 * 60 * 1000;
        }

        return token;
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < (token.accessTokenExpires as number)) {
        return token;
      }

      // Access token has expired, try to refresh it
      return refreshAccessToken(token);
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.accessToken = token.accessToken as string;
        session.user.refreshToken = token.refreshToken as string;
        session.error = token.error as string | undefined;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
