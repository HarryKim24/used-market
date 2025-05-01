import { TUserWithChat } from '@/types'
import React from 'react'
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

  const conversation = currentUser?.conversations.find((conversation) => 
    conversation.users.find((user) => user.id === receiver.receiverId));

  if (!receiver.receiverName || !currentUser) {
    return <div className='w-full h-full'></div>
  }

  return (
    <div className='w-full'>
      <div>
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

      <div className='flex flex-col gap-8 p-4 overflow-hidden h-[calc(100vh_-_60px_-_70px_-_80px)]'>
        {
          conversation &&
          conversation.messages
          .map((message) => {
            console.log('message.senderId', message.senderId)
            console.log('currentUser.id', currentUser.id)
            return (
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
            )
          })
        }
      </div>

      <div>
        <ChatInput
          receiverId={receiver?.receiverId}
          currentUserId={currentUser?.id}
        />
      </div>

    </div>
  )
}

export default Chat
