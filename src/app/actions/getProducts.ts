import clientPromise from "../../../lib/mongodb";

export interface ProductsParams {
  latitude?: number;
  longitude?: number;
  category?: string;
}

export default async function getProducts(params: ProductsParams) {
  try {
    const { latitude, longitude, category } = params;

    let query: any = {};

    if (category) {
      query.category = category;
    }

    if (latitude) {
      query.latitude = {
        gte: Number(latitude) - 0.01,
        lte: Number(latitude) + 0.01,
      }
    }

    if (longitude) {
      query.longitude = {
        gte: Number(longitude) - 0.01,
        lte: Number(longitude) + 0.01,
      }
    }

    const client = await clientPromise;
    const db = client.db();
    const products = await db.collection("products")
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    return {
      data: products,
    }
    

  } catch (error: any) {
    throw new Error(error);
  }
}