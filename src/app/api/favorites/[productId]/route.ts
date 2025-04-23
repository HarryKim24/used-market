import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { ObjectId } from "mongodb";
import clientPromise from "../../../../../lib/mongodb";

export async function POST(
  request: Request,
  context: { params: Promise<{ productId: string }> }
) {
  const params = await context.params;
  const productId = params.productId;

  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  if (!productId || typeof productId !== "string") {
    throw new Error("Invalid ID");
  }

  const client = await clientPromise;
  const db = client.db();

  await db.collection("users").updateOne(
    { _id: new ObjectId(currentUser.id) },
    { $addToSet: { favoriteIds: productId } }
  );

  const updatedUser = await db.collection("users").findOne({
    _id: new ObjectId(currentUser.id),
  });

  return NextResponse.json({
    ...updatedUser,
    _id: updatedUser?._id.toString(),
  });
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ productId: string }> }
) {
  const params = await context.params;
  const productId = params.productId;

  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  if (!productId || typeof productId !== "string") {
    throw new Error("Invalid ID");
  }

  const client = await clientPromise;
  const db = client.db();

  await db.collection("users").updateOne(
    { _id: new ObjectId(currentUser.id) },
    { $pull: { favoriteIds: productId } }
  );

  const updatedUser = await db.collection("users").findOne({
    _id: new ObjectId(currentUser.id),
  });

  return NextResponse.json({
    ...updatedUser,
    _id: updatedUser?._id.toString(),
  });
}
