import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import clientPromise from "../../../../lib/mongodb";

export async function GET(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  try {
    const client = await clientPromise;
    const db = client.db();

    const users = await db.collection('users').aggregate([
      {
        $match: {
          _id: new ObjectId(currentUser.id)
        }
      },
      {
        $lookup: {
          from: 'conversations',
          let: { userId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $in: ["$$userId", "$users"]
                }
              }
            },
            {
              $lookup: {
                from: 'messages',
                let: { conversationId: "$_id" },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $eq: ["$conversationId", "$$conversationId"]
                      }
                    }
                  },
                  {
                    $sort: { createdAt: 1 }
                  },
                  {
                    $lookup: {
                      from: 'users',
                      localField: 'senderId',
                      foreignField: '_id',
                      as: 'sender'
                    }
                  },
                  {
                    $lookup: {
                      from: 'users',
                      localField: 'receiverId',
                      foreignField: '_id',
                      as: 'receiver'
                    }
                  }
                ],
                as: 'messages'
              }
            }
          ],
          as: 'conversations'
        }
      }
    ]).toArray();

    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.error();
  }
}
