import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../../../lib/mongodb";
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
      async authorize(credentials, req) {
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
      }
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    maxAge: 30 * 24 * 60 * 60,
  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    }
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
