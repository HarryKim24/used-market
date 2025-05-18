import React from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import Avatar from '../Avatar'
import { formatTime } from '@/helpers/dayjs'

interface ChatHeaderProps {
  setLayout: (layout: boolean) => void
  receiverName: string
  receiverImage: string
  lastMessageTime: Date | undefined
}

const ChatHeader = ({
  setLayout,
  receiverName,
  receiverImage,
  lastMessageTime
}: ChatHeaderProps) => {
  return (
    <div className="pl-4 border-b border-[#d2d2d7] bg-transparent">
      <div className="flex items-center h-16 gap-4">
        <div className="flex items-center justify-center text-3xl text-gray-400">
          <button
            onClick={() => setLayout(false)}
            className="md:hidden cursor-pointer text-[#2893ff]"
          >
            <IoIosArrowBack />
          </button>
        </div>
        <div className="flex items-center gap-[0.6rem]">
          <Avatar src={receiverImage} />
          <div>
            <h2 className="text-lg font-semibold">{receiverName}</h2>
            {lastMessageTime && (
              <p className="text-neutral-400 text-xs font-medium">
                {formatTime(lastMessageTime)}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatHeader
