'use client'
import { User } from '@/types/user';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react'
import HeartButton from './HeartButton';

interface ProductCardProps {
  data: any;
  currentUser: User | null;
}

const ProductCard = ({
  data, currentUser
}: ProductCardProps) => {

  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/products/${data.id}`)}
      className='col-span-1 cursor-pointer group'
    >
      <div className='flex flex-col w-full gap-8 bg-[#f5f5f7] rounded-xl p-4'>
        <div className='relative w-full overflow-hidden aspect-square rounded-xl'>
          <Image
            src={data.imageSrc}
            fill
            sizes='auto'
            className='object-cover w-full h-full transition duration-300 group-hover:scale-110'
            alt={data.title}
            priority
          />
          <div className='absolute top-3 right-3'>
            <HeartButton
              productId={data.id}
              currentUser={currentUser}
            />
          </div>
        </div>
        <div>
          <div className='text-2xl font-bold text-center'>
            {data.title}
          </div>
          <div className='font-light text-neutral-500 text-center'>
            {data.category}
          </div>
        </div>
        <div>
          <div className='text-center text-sm'>
            <span>₩</span>
            {data.price.toLocaleString()} 
          </div>
          <div>
            {/* {data.createdAt} */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
