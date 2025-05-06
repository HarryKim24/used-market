import { TUserWithChat } from '@/types'
import React, { useEffect, useRef } from 'react'
import ChatInput from './ChatInput';
import ChatHeader from './ChatHeader';
import Message from './Message';

interface ChatProps {
  currentUser: TUserWithChat;
  receiver: {
    receiverId: string,
    receiverName: string,
    receiverImage: string
  };
  setLayout: (layout: boolean) => void;
}

const Chat = ({
  currentUser, receiver, setLayout
}: ChatProps) => {
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({
      behavior: 'smooth'
    });
  }

  useEffect(() => {
    scrollToBottom();
  });

  const conversation = currentUser?.conversations.find((conversation) =>
    conversation.users.find((user) => user.id === receiver.receiverId));

  if (!receiver.receiverName || !currentUser) {
    return <div className='w-full h-full'></div>
  }

  return (
    <div className='w-full'>
      <div className='flex flex-col gap-4 overflow-auto h-[calc(100vh_-_56px)] relative'>
        <div className="sticky top-0 z-10">
          <ChatHeader
            setLayout={setLayout}
            receiverName={receiver.receiverName}
            receiverImage={receiver.receiverImage}
            lastMessageTime={
              conversation?.messages
                .filter(message => message.receiverId === currentUser.id)
                .slice(-1)[0]?.createdAt
            }
          />
        </div>

        {conversation &&
          conversation.messages.map((message) => (
            <Message
              key={message.id}
              isSender={message.senderId === currentUser.id}
              messageText={message.text}
              messageImage={message.image}
              receiverName={receiver.receiverName}
              receiverImage={receiver.receiverImage}
              senderImage={currentUser?.image || null}
              time={message.createdAt}
            />
          ))
        }

      <div ref={messagesEndRef} />
        <div className='sticky bottom-0 z-10'>
        <div className='sticky bottom-0 h-4 z-10 bg-white/80 backdrop-blur-md' />
          <ChatInput
            receiverId={receiver?.receiverId}
            currentUserId={currentUser?.id}
          />
          <div className='sticky bottom-0 h-8 z-10 bg-white/80 backdrop-blur-md' />
        </div>
      </div>
    </div>
  )
}

export default Chat
