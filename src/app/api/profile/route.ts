import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { ObjectId } from "mongodb";
import clientPromise from "../../../../lib/mongodb";

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return new NextResponse("로그인 필요", { status: 401 });
  }

  const client = await clientPromise;
  const db = client.db();
  const userId = new ObjectId(session.user.id);

  const body = await req.json();
  const { name, newPassword } = body;

  if (!name && !newPassword) {
    return new NextResponse("수정할 항목이 없습니다.", { status: 400 });
  }

  const updateData: any = {};

  if (name) {
    const nameExists = await db.collection("users").findOne({
      name,
      _id: { $ne: userId },
    });
    if (nameExists) {
      return new NextResponse("이미 사용 중인 이름입니다.", { status: 409 });
    }
    updateData.name = name;
  }

  if (newPassword && newPassword.trim() !== "") {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    updateData.hashedPassword = hashedPassword;
  }

  await db.collection("users").updateOne({ _id: userId }, { $set: updateData });

  return NextResponse.json({ success: true });
}
