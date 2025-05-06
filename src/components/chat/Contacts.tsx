'use client'
import { TUserWithChat } from '@/types'
import React, { useState } from 'react'
import ChatUser from './ChatUser';

interface ContactsProps {
  users: TUserWithChat[];
  currentUser: TUserWithChat;
  setLayout: (layout: boolean) => void;
  setReceiver: (receiver: {
    receiverId: string;
    receiverName: string;
    receiverImage: string;
  }) => void;
}

const Contacts = ({
  users, currentUser, setLayout, setReceiver
}: ContactsProps) => {
  const [isEditMode, setIsEditMode] = useState(false);

  const filterMessages = (userId: string, userName: string | null, userImage: string | null) => {
    setReceiver({
      receiverId: userId,
      receiverName: userName || "",
      receiverImage: userImage || "",
    })
  }

  return (
    <div className='w-full overflow-auto h-[calc(100vh_-_56px)] border-[#d2d2d7] border-r-[1px]'>
      <div className="flex items-center justify-between px-3 py-2">
        <h1 className="text-3xl font-semibold">채팅</h1>
      
        <div className="flex items-center gap-4 text-[#2893ff]">
          {isEditMode && (
            <button
              className="text-red-500 cursor-pointer"
              onClick={() => {
                alert('삭제 기능은 아직 구현되지 않았습니다.');
              }}
            >
              삭제
            </button>
          )}
          <button
            className="cursor-pointer"
            onClick={() => setIsEditMode(!isEditMode)}
          >
            {isEditMode ? '완료' : '편집'}
          </button>
        </div>
      </div>

      <div className='flex flex-col'>
        {users.length > 0 &&
          users
            .filter((user) => user.id !== currentUser?.id)
            .map((user) => (
              <div
                key={user.id}
                onClick={() => {
                  if (!isEditMode) {
                    setLayout(true);
                    filterMessages(user.id, user.name ?? null, user.image ?? null);
                  }
                }}
              >
                <ChatUser user={user} currentUserId={currentUser.id} isEditMode={isEditMode} />
              </div>
            ))
        }
      </div>
    </div>
  )
}

export default Contacts
