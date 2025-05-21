import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import clientPromise from "../../../../lib/mongodb";

export async function POST(request: Request) {
  const client = await clientPromise;
  const db = client.db();

  const body = await request.json();
  const { email, name, password } = body;

  if (!email || !name || !password) {
    return new NextResponse("모든 필드를 입력해주세요.", { status: 400 });
  }

  const existingEmail = await db.collection('users').findOne({ email });
  if (existingEmail) {
    return new NextResponse("이미 존재하는 이메일입니다.", { status: 409 });
  }

  const existingName = await db.collection('users').findOne({ name });
  if (existingName) {
    return new NextResponse("이미 존재하는 이름입니다.", { status: 409 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await db.collection('users').insertOne({
    name,
    email,
    hashedPassword,
    createdAt: new Date(),
  });

  return NextResponse.json({ success: true });
}