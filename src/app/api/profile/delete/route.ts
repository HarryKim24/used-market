import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { ObjectId } from "mongodb";
import bcrypt from "bcryptjs";
import clientPromise from "../../../../../lib/mongodb";
import { authOptions } from "../../../../../lib/authOptions";

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return new NextResponse("로그인이 필요합니다.", { status: 401 });
  }

  const client = await clientPromise;
  const db = client.db();
  const userId = new ObjectId(session.user.id);

  const body = await req.json();
  const { currentPassword } = body;

  const user = await db.collection("users").findOne({ _id: userId });
  if (!user || !user.hashedPassword) {
    return new NextResponse("사용자를 찾을 수 없습니다.", { status: 404 });
  }

  const isValid = await bcrypt.compare(currentPassword, user.hashedPassword);
  if (!isValid) {
    return new NextResponse("비밀번호가 일치하지 않습니다.", { status: 403 });
  }

  await db.collection("users").deleteOne({ _id: userId });

  return NextResponse.json({ success: true });
}