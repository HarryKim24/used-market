'use client'
import { TUserWithChat } from '@/types';
import { User } from '@/types/user'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import useSWR from 'swr';

interface ChatClientProps {
  currentUser?: User | null;
}

const ChatClient = ({ currentUser }: ChatClientProps) => {

  const [receiver, setReceiver] = useState({
    receiverId: "",
    receiverName: "",
    receiverImage: "",
  });

  const [layout, setLayout] = useState(false);

  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const { data: users, error, isLoading } = useSWR('/api/chat', fetcher, {
    refreshInterval: 1000
  });

  console.log(users);

  users?.find((user: TUserWithChat) => user.email === currentUser?.email)

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error!</p>

  return (
    <main>
      <div className='grid grid-cols-[1fr] md:grid-cols-[300px_1fr]'>
        <section className={`md:flex ${layout && 'hidden'}`}>
          Contact Component
        </section>

        <section className={`md:flex ${!layout && 'hidden'}`}>
        Chat Component
        </section>
      </div>
    </main>
  )
}

export default ChatClient
