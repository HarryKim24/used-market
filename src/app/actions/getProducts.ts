import clientPromise from "../../../lib/mongodb";

export interface ProductsParams {
  latitude?: number;
  longitude?: number;
}

export default async function getProducts(params: ProductsParams = {}) {
  try {
    const {
      latitude = undefined,
      longitude = undefined,
    } = params;

    const query: any = {};

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
    const collection = db.collection("products");

    const products = await collection
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    const serializedProducts = products.map(({ _id, ...product }) => ({
      ...product,
      id: _id.toString(),
      createdAt: product.createdAt?.toISOString() || null,
    }));

    return {
      data: serializedProducts,
      totalItems: serializedProducts.length,
    };

  } catch (error: any) {
    throw new Error(error);
  }
}
