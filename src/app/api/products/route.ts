import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import clientPromise from "../../../../lib/mongodb";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();

  const {
    title,
    description,
    imageSrc,
    category,
    latitude,
    longitude,
    price,
  } = body;

  for (const key of ["title", "description", "imageSrc", "category", "latitude", "longitude", "price"]) {
    if (!body[key]) {
      return NextResponse.error();
    }
  }

  try {
    const client = await clientPromise;
    const db = client.db();

    const newProduct = {
      title,
      description,
      imageSrc,
      category,
      latitude,
      longitude,
      price: Number(price),
      userId: currentUser.id,
      createdAt: new Date(),
    };

    const result = await db.collection("products").insertOne(newProduct);

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.error();
  }
}
