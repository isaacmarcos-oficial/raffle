import { NextAuthOptions } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

const testUser = {
  id: "1",
  name: "John Doe",
  email: "admin@test.com",
  password: "qwe123"
}

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },

      },
      authorize: async (credentials) => {
        if (
          credentials?.email === testUser.email &&
          credentials.password === testUser.password
        ) {
          return testUser
        }

        const res = await fetch("/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        });
        const user = await res.json();
        if (res.ok && user) {
          return user;
        }
        return null
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),

  ],
  pages: {
    signIn: "/login",
  },
};