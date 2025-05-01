import { TUserWithChat } from '@/types'
import React from 'react'
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

  const filterMessages = (userId: string, userName: string | null, userImage: string | null) => {
    setReceiver({
      receiverId: userId,
      receiverName: userName || "",
      receiverImage: userImage || "",
    })
  }

  return (
    <div className='w-full overflow-auto h-[calc(100vh_-_56px)] border-[#d2d2d7] border-r-[1px]'>
      <h1 className='m-4 text-2xl font-semibold'>Chat</h1>
      <hr className="border-[#d2d2d7]" />
      <div className='flex flex-col'>
        {users.length > 0 &&
          users
            .filter((user) => user.id !== currentUser?.id)
            .map((user) => {
              return (
                <div 
                  key={user.id} 
                  onClick={() => {
                    setLayout(true)
                    filterMessages(user.id, user.name ?? null, user.image ?? null)
                  }}
                >
                  <ChatUser user={user} currentUserId={currentUser?.id} />
                </div>
              )
            })
        }
      </div>
    </div>
  )
}

export default Contacts
