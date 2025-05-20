import { previewImage } from '@/helpers/previewImage';
import { uploadImage } from '@/helpers/uploadImage';
import React, { FormEvent, useRef, useState } from 'react';
import { CgClose } from 'react-icons/cg';
import { FaArrowUp } from 'react-icons/fa6';
import { GoPlus } from 'react-icons/go';
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
  }).then(res => res.json());
};

const ChatInput = ({
  receiverId, currentUserId
}: ChatInputProps) => {

  const [message, setMessage] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const imageRef = useRef<HTMLInputElement>(null);

  const chooseImage = () => {
    imageRef.current?.click();
  };

  const { trigger } = useSWRMutation('/api/chat', sendRequest);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const imageUrl = image ? await uploadImage(image as File) : null;

    if (message || imageUrl) {
      try {
        trigger({
          text: message,
          image: imageUrl,
          receiverId: receiverId,
          senderId: currentUserId,
        });
      } catch (error) {
        console.error(error);
      }
    }

    setMessage('');
    setImage(null);
    setImagePreview(null);
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  return (
    <form
      className='
        relative flex flex-col items-start w-full gap-2 bg-white
        p-2 border-[1px] border-gray-300 rounded-4xl shadow-sm
      '
      onSubmit={handleSubmit}
    >

      {imagePreview && (
        <div className='relative w-full max-w-[300px] overflow-hidden rounded-md shadow-md'>
          <img src={imagePreview} alt='미리보기' className='w-full h-auto' />
          <span
            onClick={removeImage}
            className='
              absolute flex items-center justify-center p-2 text-xl text-white
              bg-gray-900 cursor-pointer top-[0.4rem] right-[0.4rem] rounded-full
              opacity-60 hover:opacity-100
            '
          >
            <CgClose />
          </span>
        </div>
      )}

      <div className='flex items-center w-full gap-4'>
        <div
          onClick={chooseImage}
          className='text-2xl text-white cursor-pointer bg-gray-400 p-[4px] rounded-full'
        >
          <GoPlus />
        </div>

        <input
          className='w-full text-base outline-none'
          type='text'
          placeholder='메시지 보내기'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <input
          type='file'
          className='hidden'
          ref={imageRef}
          onChange={(e) => {
            previewImage(e, setImagePreview, setImage);
          }}
          accept='image/*'
          multiple={false}
        />

        <button
          type='submit'
          className='
            flex items-center justify-center p-2 bg-green-400 
            rounded-4xl cursor-pointer disabled:opacity-60
          '
        >
          <FaArrowUp className='text-white' />
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
