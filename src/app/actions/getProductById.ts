/* eslint-disable @typescript-eslint/no-explicit-any */
import { ObjectId } from "mongodb";
import clientPromise from "../../../lib/mongodb";

export interface Params {
  productId?: string;
}

export default async function getProductById(params: Params) {
  try {
    const { productId } = params;
    if (!productId || !ObjectId.isValid(productId)) return null;

    const client = await clientPromise;
    const db = client.db();
    const productsCollection = db.collection("products");
    const usersCollection = db.collection("users");

    const product = await productsCollection.findOne({ _id: new ObjectId(productId) });
    if (!product) return null;

    let user = null;
    if (product.userId && ObjectId.isValid(product.userId)) {
      user = await usersCollection.findOne({ _id: new ObjectId(product.userId) });
    }

    const { _id: productObjectId, ...productWithoutId } = product;

    return {
      id: productObjectId.toString(),
      ...productWithoutId,
      createdAt: product.createdAt ? new Date(product.createdAt).toISOString() : null,
      user: user
        ? (() => {
            const { _id: userObjectId, ...userWithoutId } = user;
            return {
              id: userObjectId.toString(),
              ...userWithoutId,
              createdAt: user.createdAt ? new Date(user.createdAt).toISOString() : null,
            };
          })()
        : null,
    };

  } catch (error: any) {
    throw new Error(error.message || 'Failed to fetch product');
  }
}
