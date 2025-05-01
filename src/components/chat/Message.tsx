import React from 'react'
import Avatar from '../Avatar';

interface MessageProps {
  isSender: boolean;
  messageText?: string | null;
  messageImage?: string | null;
  receiverName: string;
  receiverImage: string;
  senderImage: string | null;
  time: Date;
}

const Message = ({
  isSender, messageText, messageImage,
  receiverName, receiverImage, senderImage, time
}: MessageProps) => {

  console.log('isSender', isSender);

  return (
    <div>
      <div>
        <Avatar src={senderImage && isSender ? senderImage : receiverImage} />
      </div>
      <div>
        <div>
          <span>{isSender ? 'You' : receiverName}</span>
          <span>

          </span>
        </div>
      </div>
    </div>
  )
}

export default Message
