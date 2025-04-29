import { User } from "./user";

export interface Conversation {
  id: string;
  name?: string;
  senderId: string;
  receiverId: string;
  users: User[];
  messages: Message[];
  createdAt: Date;
}

export interface Message {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  text?: string;
  image?: string;
  senderId: string;
  receiverId: string;
  conversationId: string;
  sender?: User;
  receiver?: User;
  conversation?: Conversation;
}