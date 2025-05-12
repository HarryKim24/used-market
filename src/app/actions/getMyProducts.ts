import clientPromise from '../../../lib/mongodb';

export default async function getMyProducts(userId?: string) {
  const client = await clientPromise;
  const db = client.db();

  const query = userId ? { userId } : {};
  const products = await db.collection('products').find(query).toArray();

return products.map(product => ({
  ...product,
  id: product._id.toString(),
  _id: product._id.toString(),
  userId: product.userId.toString(),
}));

}

