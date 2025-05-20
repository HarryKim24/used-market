import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions, SessionStrategy, User, Session } from "next-auth";
import type { JWT } from "next-auth/jwt";
import clientPromise from "./mongodb";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "이메일", type: "text" },
        password: { label: "암호", type: "password" },
      },
      async authorize(credentials) {
        const client = await clientPromise;
        const db = client.db();

        const { email, password } = credentials || {};

        if (!email || !password) {
          throw new Error("MissingCredentials");
        }

        const user = await db.collection("users").findOne({ email });

        if (!user || !user.hashedPassword) {
          throw new Error("InvalidCredentials");
        }

        const isCorrectPassword = await bcrypt.compare(password, user.hashedPassword);

        if (!isCorrectPassword) {
          throw new Error("InvalidCredentials");
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt" as SessionStrategy,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    maxAge: 30 * 24 * 60 * 60,
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      return { ...token, ...user };
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      session.user = token;
      return session;
    },
  },
};