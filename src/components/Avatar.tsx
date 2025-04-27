'use client';

import Image from 'next/image';
import React from 'react';

interface AvatarProps {
  src?: string | null;
}

const Avatar = ({ src }: AvatarProps) => {
  if (!src) {
    return (
      <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-[9px] text-gray-600 leading-none text-center">
        no user image
      </div>
    );
  }

  return (
    <Image
      className="w-10 h-10 rounded-full object-cover"
      height={40}
      width={40}
      alt="Avatar"
      src={src}
    />
  );
};

export default Avatar;
