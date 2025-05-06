import { TConversation, TUserWithChat } from '@/types'
import React from 'react'
import Avatar from '../Avatar';
import { fromNow } from '@/helpers/dayjs';
import { FaRegCircle } from 'react-icons/fa6';

interface ChatUserProps {
  user: TUserWithChat;
  currentUserId: string;
  isEditMode?: boolean;
}

const ChatUser = ({
  user, currentUserId, isEditMode = false
}: ChatUserProps) => {
  const messageWithCurrentUser = user.conversations.find(
    (conversation: TConversation) =>
      conversation.users.find((user) => user.id === currentUserId)
  );
  const latestMessage = messageWithCurrentUser?.messages.slice(-1)[0];

  return (
    <div className="px-2 hover:cursor-pointer mt-2">
      <div
        className={`
          grid items-center gap-3
          ${isEditMode
            ? 'grid-cols-[32px_40px_1fr_50px]'
            : 'grid-cols-[40px_1fr_50px]'}
        `}
      >
        {isEditMode && (
          <div className="flex items-center justify-center text-gray-500">
            <button>
              <FaRegCircle />
            </button>
          </div>
        )}

        <div>
          <Avatar src={user.image} />
        </div>

        <div>
          <h3 className="font-semibold">
            {(user.name ?? '알 수 없음').length > 10
              ? `${(user.name ?? '알 수 없음').slice(0, 10)}...`
              : (user.name ?? '알 수 없음')}
          </h3>
          {latestMessage?.text ? (
            <p className="overflow-hidden text-xs font-medium text-gray-600 break-words whitespace-pre-wrap">
              {latestMessage.text.length > (isEditMode ? 30 : 40)
                ? `${latestMessage.text.slice(0, isEditMode ? 30 : 40)}...`
                : latestMessage.text}
            </p>
          ) : latestMessage?.image ? (
            <p className="text-xs font-medium text-gray-600">[이미지]</p>
          ) : null}
        </div>

        <div className="flex justify-end text-xs text-gray-500">
          {latestMessage && <p>{fromNow(latestMessage.createdAt)}</p>}
        </div>
      </div>
      <div className="mt-4 h-px bg-neutral-300 mx-2" />
    </div>
  );
};

export default ChatUser;
