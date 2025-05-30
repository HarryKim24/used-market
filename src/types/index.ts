import { Message } from "./conversation";
import { User } from "./user";

export type TUserWithChat = User & {
  conversations: TConversation[];
}

export type TConversation = {
  id: string;
  messages: Message[];
  users: User[];
  deletedBy?: string[];
};