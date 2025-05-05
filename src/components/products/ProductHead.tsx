import { User } from '@/types/user';
import React from 'react'
import LocalNav from '../nav/LocalNav';
import Image from 'next/image';
import HeartButton from '../HeartButton';

interface ProductHeadProps {
  title: string;
  imageSrc: string;
  id: string;
  currentUser?: User | null;
}

const ProductHead = ({
  title, imageSrc, id, currentUser
}: ProductHeadProps) => {
  return (
    <>
      <LocalNav title={title} />
      <div 
        className='
          w-full h-[35vh] md:h-[70vh] overflow-hidden rounded-xl relative bg-neutral-300
        '
      >
        <Image
          src={imageSrc}
          fill
          className='object-contain w-full'
          alt={`${title} image`}
        />
        <div className='absolute top-5 right-5'>
          <HeartButton
            productId={id}
            currentUser={currentUser}
          />
        </div>
      </div>
    </>
  )
}

export default ProductHead