import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { ObjectId } from "mongodb";
import clientPromise from "../../../../../lib/mongodb";


export async function DELETE(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const url = new URL(request.url);
  const productId = url.pathname.split("/").pop();

  if (!productId) {
    return new NextResponse("Product ID is required", { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db();

    const product = await db.collection("products").findOne({ _id: new ObjectId(productId) });

    if (!product) {
      return new NextResponse("Product not found", { status: 404 });
    }

    if (product.userId !== currentUser.id) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    await db.collection("products").deleteOne({ _id: new ObjectId(productId) });

    return new NextResponse("Deleted", { status: 200 });
  } catch (error) {
    console.error("[PRODUCT_DELETE_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}