'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import axios from 'axios'
import { TUserWithChat } from '@/types'
import { User } from '@/types/user'
import Contacts from '@/components/chat/Contacts'
import Chat from '@/components/chat/Chat'

const ChatClient = ({ currentUser }: { currentUser?: User | null }) => {
  const searchParams = useSearchParams();
  const receiverIdFromQuery = searchParams.get("receiverId");

  const [receiver, setReceiver] = useState({
    receiverId: "",
    receiverName: "",
    receiverImage: "",
  });
  const [layout, setLayout] = useState(false);

  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const { data: users, error } = useSWR('/api/chat', fetcher, {
    refreshInterval: 1000
  });

  const currentUserWithMessage = users?.find((user: TUserWithChat) => user.email === currentUser?.email);

  useEffect(() => {
    if (receiverIdFromQuery && users) {
      const foundUser = users.find((user: TUserWithChat) => user.id === receiverIdFromQuery);

      if (foundUser) {
        setReceiver({
          receiverId: foundUser.id,
          receiverName: foundUser.name ?? "",
          receiverImage: foundUser.image ?? "",
        });
        setLayout(true);
      }
    }
  }, [receiverIdFromQuery, users]);

  if (error) return <p>Error!</p>;

  return (
    <main>
      <div className='grid grid-cols-[1fr] md:grid-cols-[320px_1fr]'>
        <section className={`md:flex ${layout && 'hidden'}`}>
          <Contacts
            users={users}
            currentUser={currentUserWithMessage}
            setLayout={setLayout}
            setReceiver={setReceiver}
          />
        </section>

        <section className={`md:flex ${!layout && 'hidden'}`}>
          <Chat
            currentUser={currentUserWithMessage}
            receiver={receiver}
            setLayout={setLayout}
          />
        </section>
      </div>
    </main>
  );
};

export default ChatClient;