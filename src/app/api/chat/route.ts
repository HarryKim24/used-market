/* eslint-disable @typescript-eslint/no-explicit-any */
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import clientPromise from "../../../../lib/mongodb";

function normalizeMongoIds(obj: any): any {
  if (Array.isArray(obj)) return obj.map(normalizeMongoIds);
  if (obj && typeof obj === "object") {
    const newObj: any = {};
    for (const key in obj) {
      const value = obj[key];
      if (key === "_id") newObj["id"] = value.toString();
      else if (value instanceof Date) newObj[key] = value.toISOString();
      else if (value && typeof value === 'object' && typeof value.toHexString === 'function')
        newObj[key] = value.toString();
      else newObj[key] = normalizeMongoIds(value);
    }
    return newObj;
  }
  return obj;
}

export async function GET() {
  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.error();

  try {
    const client = await clientPromise;
    const db = client.db();

    const users = await db.collection("users").aggregate([
      {
        $lookup: {
          from: "conversations",
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
                from: "messages",
                let: { conversationId: "$_id" },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $eq: ["$conversationId", "$$conversationId"]
                      }
                    }
                  },
                  { $sort: { createdAt: 1 } },
                  {
                    $lookup: {
                      from: "users",
                      localField: "senderId",
                      foreignField: "_id",
                      as: "sender"
                    }
                  },
                  {
                    $lookup: {
                      from: "users",
                      localField: "receiverId",
                      foreignField: "_id",
                      as: "receiver"
                    }
                  }
                ],
                as: "messages"
              }
            },
            {
              $lookup: {
                from: "users",
                localField: "users",
                foreignField: "_id",
                as: "users"
              }
            }
          ],
          as: "conversations"
        }
      }
    ]).toArray();

    const normalized = normalizeMongoIds(users);
    return NextResponse.json(normalized);
  } catch (error) {
    console.error("[GET_CHAT_ERROR]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.error();

  const client = await clientPromise;
  const db = client.db();
  const body = await request.json();

  const senderId = new ObjectId(body.senderId);
  const receiverId = new ObjectId(body.receiverId);
  const senderIdStr = body.senderId;
  const receiverIdStr = receiverId.toString();

  try {
    const conversation = await db.collection("conversations").findOne({
      users: { $all: [senderId, receiverId] }
    });

    let conversationId: ObjectId;

    if (conversation) {
      conversationId = conversation._id;

      const updates: any = {};

      if (conversation.deletedBy?.includes(senderIdStr)) {
        updates.$pull = { ...(updates.$pull || {}), deletedBy: senderIdStr };
      }

      if (conversation.deletedBy?.includes(receiverIdStr)) {
        updates.$pull = { ...(updates.$pull || {}), deletedBy: receiverIdStr };
      }

      if (Object.keys(updates).length > 0) {
        await db.collection("conversations").updateOne(
          { _id: conversationId },
          updates
        );
      }

    } else {
      const newConv = await db.collection("conversations").insertOne({
        senderId,
        receiverId,
        users: [senderId, receiverId],
        createdAt: new Date(),
        deletedBy: [],
      });
      conversationId = newConv.insertedId;
    }

    const newMessage = await db.collection("messages").insertOne({
      text: body.text ?? null,
      image: body.image ?? null,
      senderId,
      receiverId,
      conversationId,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    const message = await db.collection("messages").findOne({
      _id: newMessage.insertedId
    });

    const normalizedMessage = normalizeMongoIds(message);
    return NextResponse.json(normalizedMessage);
  } catch (error) {
    console.error("[POST_CHAT_ERROR]", error);
    return NextResponse.json({ error: "Failed to create message" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.error();

  const client = await clientPromise;
  const db = client.db();
  const body = await request.json();

  const conversationIds: string[] = body.conversationIds;
  const deleted: boolean = body.deleted;

  if (!Array.isArray(conversationIds) || typeof deleted !== "boolean") {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  try {
    const objectIds = conversationIds.map((id) => new ObjectId(id));
    const userId = currentUser.id;

    const updateQuery = deleted
      ? {
          $addToSet: { deletedBy: userId },
          $set: { deletedAt: new Date() },
        }
      : {
          $pull: { deletedBy: userId },
          $unset: { deletedAt: "" },
        };

        const result = await db.collection("conversations").updateMany(
          { _id: { $in: objectIds } },
          updateQuery as any
        );
        

    return NextResponse.json({ modifiedCount: result.modifiedCount });
  } catch (error) {
    console.error("[PATCH_CONVERSATIONS_ERROR]", error);
    return NextResponse.json({ error: "Failed to update conversations" }, { status: 500 });
  }
}