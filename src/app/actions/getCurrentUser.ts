import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import clientPromise from "../../../lib/mongodb";

export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getCurrentUser() {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const email = session.user.email;

    const client = await clientPromise;
    const db = client.db();
    const currentUser = await db.collection("users").findOne({ email });

    if (!currentUser) {
      return null;
    }

    return {
      id: currentUser._id.toString(),
      name: currentUser.name,
      email: currentUser.email,
      createdAt: currentUser.createdAt?.toISOString?.() ?? null,
    };

  } catch (error) {
    console.error('[getCurrentUser ERROR]', error);
    return null;
  }
}
