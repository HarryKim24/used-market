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
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [showDeleted, setShowDeleted] = useState(false);

  const toggleUserSelection = (userId: string) => {
    setSelectedUserIds((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const filterMessages = (userId: string, userName: string | null, userImage: string | null) => {
    setReceiver({
      receiverId: userId,
      receiverName: userName || "",
      receiverImage: userImage || "",
    });
  };

  const updateConversationDeletedState = async (deletedState: boolean) => {
    const selectedConversations = users
      .filter((user) => selectedUserIds.includes(user.id))
      .map((user) => {
        const convo = user.conversations.find((conversation) =>
          conversation.users.some((u) => u.id === currentUser.id)
        );
        return convo?.id;
      })
      .filter(Boolean);

    if (selectedConversations.length === 0) return;

    try {
      const res = await fetch('/api/chat', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          conversationIds: selectedConversations,
          deleted: deletedState
        }),
      });

      if (!res.ok) throw new Error('업데이트 실패');

      const data = await res.json();
      console.log(deletedState ? '삭제된 개수:' : '복원된 개수:', data.modifiedCount);

      setSelectedUserIds([]);
      setIsEditMode(false);
    } catch (err) {
      console.error('요청 실패:', err);
    }
  };

  return (
    <div className='w-full overflow-auto h-[calc(100vh_-_56px)] border-[#d2d2d7] border-r-[1px]'>
      <div className="flex items-center justify-between px-3 py-2">
        <h1 className="text-3xl font-semibold">채팅</h1>

        <div className="flex items-center gap-4 text-[#2893ff] text-sm">
          {isEditMode && (
            <>
              {!showDeleted ? (
                <button
                  className="text-red-500 cursor-pointer"
                  onClick={() => updateConversationDeletedState(true)}
                >
                  삭제
                </button>
              ) : (
                <button
                  className="text-green-600 cursor-pointer"
                  onClick={() => updateConversationDeletedState(false)}
                >
                  복원
                </button>
              )}
            </>
          )}
          <button
            className="cursor-pointer"
            onClick={() => {
              if (isEditMode) setSelectedUserIds([]);
              setIsEditMode(!isEditMode);
            }}
          >
            {isEditMode ? '완료' : '편집'}
          </button>
          {!isEditMode && (
            <button
              className="cursor-pointer"
              onClick={() => {
                setShowDeleted((prev) => !prev);
                setSelectedUserIds([]);
                setIsEditMode(false);
              }}
            >
              {showDeleted ? '대화 목록' : '삭제된 대화'}
            </button>
          )}
        </div>
      </div>

      {showDeleted && (
        <div className="px-4 py-2 text-sm text-red-500 font-medium border-b border-red-200">
          새로운 대화가 없을 시 30일 후에 해당 대화가 영구적으로 삭제됩니다.
        </div>
      )}

      <div className='flex flex-col'>
      {users.length > 0 &&
        users
          .filter((user) => user.id !== currentUser?.id)
          .filter((user) => {
            const conversation = user.conversations.find((c) =>
              c.users.some((u) => u.id === currentUser.id)
            );
            return showDeleted
              ? conversation?.deleted === true
              : conversation?.deleted !== true;
          })
          .map((user) => {
            const conversation = user.conversations.find((c) =>
              c.users.some((u) => u.id === currentUser.id)
            );

            return (
              <div
                key={user.id}
                onClick={() => {
                  if (!isEditMode) {
                    setLayout(true);
                    filterMessages(user.id, user.name ?? null, user.image ?? null);
                  }
                }}
              >
                <ChatUser
                  user={user}
                  currentUserId={currentUser.id}
                  isEditMode={isEditMode}
                  isSelected={selectedUserIds.includes(user.id)}
                  onToggleSelect={() => toggleUserSelection(user.id)}
                  isDeleted={conversation?.deleted === true}
                  deletedAt={conversation?.deletedAt}
                />
              </div>
            );
          })}

      </div>
    </div>
  )
}

export default Contacts;
