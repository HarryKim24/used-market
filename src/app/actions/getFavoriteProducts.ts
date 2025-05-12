
import { ObjectId } from "mongodb";
import clientPromise from "../../../lib/mongodb";

export default async function getProductsByIds(productIds: string[]) {
  if (!productIds || productIds.length === 0) return [];

  const client = await clientPromise;
  const db = client.db();

  const objectIds = productIds.map((id) => new ObjectId(id));

  const products = await db
    .collection("products")
    .find({ _id: { $in: objectIds } })
    .toArray();

  return products.map((product) => ({
    ...product,
    id: product._id.toString(),
    _id: product._id.toString(),
    userId: product.userId?.toString(),
  }));
}
