import clientPromise from "../../../lib/mongodb";

export interface ProductsParams {
  latitude?: number;
  longitude?: number;
  category?: string;
}

export default async function getProducts(params: ProductsParams = {}) {
  try {
    const {
      latitude = undefined,
      longitude = undefined,
      category = undefined
    } = params;

    let query: any = {};

    if (category) query.category = category;
    if (latitude) {
      query.latitude = {
        $gte: Number(latitude) - 0.01,
        $lte: Number(latitude) + 0.01,
      };
    }
    if (longitude) {
      query.longitude = {
        $gte: Number(longitude) - 0.01,
        $lte: Number(longitude) + 0.01,
      };
    }

    const client = await clientPromise;
    const db = client.db();
    const products = await db.collection("products")
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    const serializedProducts = products.map(({ _id, ...product }) => ({
      ...product,
      id: _id.toString(),
      createdAt: product.createdAt?.toISOString() || null,
    }));

    return { data: serializedProducts };

  } catch (error: any) {
    throw new Error(error);
  }
}
