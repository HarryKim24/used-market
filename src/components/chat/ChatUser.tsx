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
    <div 
      className='
        grid grid-cols-[40px_1fr_50px] grid-rows-[40px] gap-3 
        py-3 px-4 border-[#d2d2d7] border-b-[1px] hover:cursor-pointer
      '
    >
      <div>
        <Avatar src={user.image} />
      </div>
      <div>
        <h3>{user.name}</h3>

        {latestMessage?.text ? (
          <p className='
            overflow-hidden text-xs font-medium text-gray-600
            break-words whitespace-pre-wrap
          '>
            {latestMessage.text}
          </p>
        ) : latestMessage?.image ? (
          <p className='text-xs font-medium text-gray-600'>[이미지]</p>
        ) : null}
        
      </div>
      <div className='flex justify-end text-xs text-gray-500'>
        {latestMessage && (
          <p>{fromNow(latestMessage.createdAt)}</p>
        )}
      </div>
    </div>
  )
}

export default ChatUser