'use client'

import { TUserWithChat } from '@/types'
import React, { useEffect, useRef } from 'react'
import ChatInput from './ChatInput'
import ChatHeader from './ChatHeader'
import Message from './Message'

interface ChatProps {
  currentUser: TUserWithChat
  receiver: {
    receiverId: string
    receiverName: string
  }
  setLayout: (layout: boolean) => void
}

const Chat = ({
  currentUser,
  receiver,
  setLayout
}: ChatProps) => {
  const messagesEndRef = useRef<null | HTMLDivElement>(null)

  const conversation = currentUser?.conversations.find((conversation) =>
    conversation.users.find((user) => user.id === receiver.receiverId)
  )

  useEffect(() => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' })
  }, [conversation?.messages.length])

  if (!receiver.receiverName || !currentUser) {
    return <div className="w-full h-full" />
  }

  return (
    <div className="relative w-full h-[calc(100vh-56px)]">
      <div className="h-full flex flex-col overflow-hidden">
        <div className="flex-1 overflow-auto pb-[112px]">
          <div className="sticky top-0 z-10 bg-white/70 backdrop-blur-lg backdrop-saturate-150">
            <ChatHeader
              setLayout={setLayout}
              receiverName={receiver.receiverName}
              lastMessageTime={
                conversation?.messages
                  .filter((m) => m.receiverId === currentUser.id || m.receiverId === receiver.receiverId)
                  .slice(-1)[0]?.createdAt
              }
            />
          </div>
          {conversation?.messages.map((message) => (
            <Message
              key={message.id}
              isSender={message.senderId === currentUser.id}
              messageText={message.text}
              messageImage={message.image}
              receiverName={receiver.receiverName}
              senderName={currentUser.name ?? ''}
              time={message.createdAt}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div
        className="absolute bottom-0 left-0 right-0 z-20 bg-white/70 backdrop-blur-lg pr-[15px]"
        style={{
          WebkitMaskImage: 'linear-gradient(to left, transparent 15px, black 15px)',
          maskImage: 'linear-gradient(to left, transparent 15px, black 15px)'
        }}
      >
        <div className="h-4" />
        <ChatInput
          receiverId={receiver.receiverId}
          currentUserId={currentUser.id}
        />
        <div className="h-8" />
      </div>
    </div>
  )
}

export default Chat
