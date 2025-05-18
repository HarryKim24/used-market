import React from 'react'
import { fromNow } from '@/helpers/dayjs';
import Image from 'next/image';

interface MessageProps {
  isSender: boolean;
  messageText?: string | null;
  messageImage?: string | null;
  receiverName: string;
  senderName: string;
  time: Date;
}


const Message = ({
  isSender, messageText, messageImage,
  receiverName, senderName, time
}: MessageProps) => {

  return (
    <div
      className={`grid w-full grid-cols-[40px_1fr] gap-3 mx-auto p-4`}
      style={{ direction: `${isSender ? 'rtl' : 'ltr'}` }}
    >
      <div>
        <div>
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-300 text-white font-bold text-sm select-none">
            {(isSender ? senderName : receiverName).charAt(0).toUpperCase()}
          </div>
        </div>
      </div>
      <div className='flex flex-col items-start justify-center'>
        <div className='flex items-center gap-2 mb-2 text-sm'>
          <span className='font-medium'>{isSender ? '나' : receiverName}</span>
          <span className='text-xs text-gray-500 opacity-80'>
            {fromNow(time)}
          </span>
        </div>

        {messageImage && (
          <div className='overflow-hidden rounded-4xl max-w-[80%] mb-2'>
            <Image
              src={messageImage}
              width={300}
              height={300}
              alt=''

            />
          </div>
        )}

        {messageText && (
          <div style={{ direction: 'ltr' }} className={`
            p-2 pl-4 pr-4 break-all text-white rounded-4xl max-w-[80%]
            ${isSender ? "bg-[#2893ff] rounded-tr-none" : "bg-gray-400 rounded-tl-none"}
          `}>
            <p>{messageText}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Message
