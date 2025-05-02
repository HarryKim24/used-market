import axios from 'axios';
import React, { FormEvent, useState } from 'react'
import { IoImageOutline } from 'react-icons/io5';
import { RiSendPlaneLine } from 'react-icons/ri';
import useSWRMutation from 'swr/mutation';

interface ChatInputProps {
  receiverId: string;
  currentUserId: string;
}

const sendRequest = (url: string, { arg }: {
  arg: {
    text: string;
    image: string;
    receiverId: string;
    senderId: string;
  }
}) => {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(arg)
  }).then(res => res.json())
}

const ChatInput = ({
  receiverId, currentUserId
}: ChatInputProps) => {

  const [message, setMessage] = useState("");

  const { trigger } = useSWRMutation('/api/chat', sendRequest);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const imageUrl = '';

    if (message || imageUrl) {
      try {
        trigger({
          text: message,
          image: imageUrl,
          receiverId: receiverId,
          senderId: currentUserId,
        })
      } catch (error) {
        console.error(error);
      }
    }

    setMessage('');
  }

  return (
    <form
      className='
        relative flex items-center justify-between w-full gap-4 
        p-2 pl-4 border-[1px] border-gray-300 rounded-md shadow-sm'
      onSubmit={handleSubmit}  
    >
      <input 
        className='w-full text-base outline-none' 
        type='text'
        placeholder='메시지 보내기'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <div className='text-2xl text-gray-300 cursor-pointer'>
        <IoImageOutline />
      </div>
      <button
        type='submit'
        className='
          flex items-center justify-center p-2 bg-gray-500 
          rounded-lg cursor-pointer disabled:opacity-60'
      >
        <RiSendPlaneLine className='text-white' />
      </button>
    </form>
  )
}

export default ChatInput
