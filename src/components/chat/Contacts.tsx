'use client'

import { TUserWithChat } from '@/types'
import React, { useState } from 'react'
import ChatUser from './ChatUser'

interface ContactsProps {
  users: TUserWithChat[]
  currentUser: TUserWithChat
  setLayout: (layout: boolean) => void
  setReceiver: (receiver: {
    receiverId: string
    receiverName: string
    receiverImage: string
  }) => void
}

const Contacts = ({
  users,
  currentUser,
  setLayout,
  setReceiver
}: ContactsProps) => {
  const [isEditMode, setIsEditMode] = useState(false)
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([])

  const toggleUserSelection = (userId: string) => {
    setSelectedUserIds((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    )
  }

  const filterMessages = (
    userId: string,
    userName: string | null,
    userImage: string | null
  ) => {
    setReceiver({
      receiverId: userId,
      receiverName: userName || '',
      receiverImage: userImage || ''
    })
  }

  const handleDelete = async () => {
    const selectedConversations = users
      .filter((user) => selectedUserIds.includes(user.id))
      .map((user) => {
        const convo = user.conversations.find((conversation) =>
          conversation.users.some((u) => u.id === currentUser.id)
        )
        return convo?.id
      })
      .filter(Boolean)

    if (selectedConversations.length === 0) return

    try {
      const res = await fetch('/api/chat', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversationIds: selectedConversations,
          deleted: true
        })
      })

      if (!res.ok) throw new Error('삭제 실패')

      const data = await res.json()
      console.log('삭제된 개수:', data.modifiedCount)

      setSelectedUserIds([])
      setIsEditMode(false)
    } catch (err) {
      console.error('삭제 요청 실패:', err)
    }
  }

  return (
    <div className="w-full overflow-auto h-[calc(100vh_-_56px)] border-[#d2d2d7] border-r-[1px]">
      <div className="flex items-center justify-between px-3 py-2">
        <h1 className="text-3xl font-semibold">채팅</h1>

        <div className="flex items-center gap-4 text-[#2893ff] text-sm">
          {isEditMode && (
            <button
              className="text-red-500 cursor-pointer"
              onClick={handleDelete}
            >
              삭제
            </button>
          )}
          <button
            className="cursor-pointer"
            onClick={() => {
              if (isEditMode) setSelectedUserIds([])
              setIsEditMode(!isEditMode)
            }}
          >
            {isEditMode ? '완료' : '편집'}
          </button>
        </div>
      </div>

      <div className="flex flex-col">
        {users.length > 0 &&
          users
            .filter((user) => user.id !== currentUser.id)
            .map((user) => {
              const conversation = user.conversations.find((c) =>
                c.users.some((u) => u.id === currentUser.id)
              )

              if (!conversation || conversation.deletedBy?.includes(currentUser.id)) {
                return null
              }

              return (
                <div
                  key={user.id}
                  onClick={() => {
                    if (!isEditMode) {
                      setLayout(true)
                      filterMessages(user.id, user.name ?? null, user.image ?? null)
                    }
                  }}
                >
                  <ChatUser
                    user={user}
                    currentUserId={currentUser.id}
                    isEditMode={isEditMode}
                    isSelected={selectedUserIds.includes(user.id)}
                    onToggleSelect={() => toggleUserSelection(user.id)}
                  />
                </div>
              )
            })}
      </div>
    </div>
  )
}

export default Contacts
