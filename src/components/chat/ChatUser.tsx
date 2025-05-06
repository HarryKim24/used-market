import { TConversation, TUserWithChat } from '@/types'
import React from 'react'
import Avatar from '../Avatar';
import { fromNow } from '@/helpers/dayjs';

interface ChatUserProps {
  user: TUserWithChat;
  currentUserId: string;
}

const ChatUser = ({
  user, currentUserId
}: ChatUserProps) => {

  const messageWithCurrentUser = user.conversations.find(
    (conversation: TConversation) =>
      conversation.users.find((user) => user.id === currentUserId)
  );

  const latestMessage = messageWithCurrentUser?.messages.slice(-1)[0];

  return (
    <div className="px-4 hover:cursor-pointer mt-2">
      <div
        className="
          grid grid-cols-[40px_1fr_50px] grid-rows-[40px] gap-3 
        "
      >
        <div>
          <Avatar src={user.image} />
        </div>
        <div>
          <h3 className='font-semibold'>
            {(user.name ?? '알 수 없음').length > 10
              ? `${(user.name ?? '알 수 없음').slice(0, 10)}...`
              : (user.name ?? '알 수 없음')}
          </h3>
          {latestMessage?.text ? (
            <p className="
              overflow-hidden text-xs font-medium text-gray-600
              break-words whitespace-pre-wrap
            ">
              {latestMessage.text.length > 40
                ? `${latestMessage.text.slice(0, 40)}...`
                : latestMessage.text}
            </p>
          ) : latestMessage?.image ? (
            <p className="text-xs font-medium text-gray-600">[이미지]</p>
          ) : null}
        </div>
        <div className="flex justify-end text-xs text-gray-500">
          {latestMessage && (
            <p>{fromNow(latestMessage.createdAt)}</p>
          )}
        </div>
      </div>
      <div className="mt-6 h-px bg-neutral-300 mx-2" />
    </div>
  );
  
}

export default ChatUser