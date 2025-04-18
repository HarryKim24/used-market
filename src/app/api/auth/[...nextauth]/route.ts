import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../../../lib/mongodb";
import email from "next-auth/providers/email";
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
          throw new Error("이메일과 비밀번호를 입력해주세요.");
        }
      
        const user = await db.collection("users").findOne({ email });
      
        if (!user || !user.hashedPassword) {
          throw new Error("계정이 존재하지 않거나 비밀번호가 틀렸습니다.");
        }
      
        const isCorrectPassword = await bcrypt.compare(password, user.hashedPassword);
      
        if (!isCorrectPassword) {
          throw new Error("비밀번호가 일치하지 않습니다.");
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
    maxAge: 30 * 24 * 60 * 60
  },
  pages: {
    signIn: '/auth/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user }
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    }
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
