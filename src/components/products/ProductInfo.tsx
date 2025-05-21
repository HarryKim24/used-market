import { User } from '@/types/user'
import React from 'react'
import { IconType } from 'react-icons';
import ProductCategory from './ProductCategory';
import { formatTime } from '@/helpers/dayjs';

interface ProductInfoProps {
  user: User;
  description: string;
  createdAt: Date;
  category: {
    icon: IconType,
    label: string,
    description: string;
  }
}

const ProductInfo = ({
  user, description, createdAt, category
}: ProductInfoProps) => {
  return (
    <div>
      <div className='flex flex-col gap-2'>
        <div className='flex items-center gap-2 text-xl font-semibold'>
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-300 text-white font-bold text-sm select-none">
            {user?.name?.charAt(0).toUpperCase() ?? '?'}
          </div>
          <p>{user?.name}</p>
        </div>
        <div className='text-xs text-neutral-500'>
          {
            formatTime(createdAt)
          }
        </div>
        <hr className="border-[#d2d2d7] py-2" />
      </div>
      {
        category && 
        <ProductCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      }
      <hr className="border-[#d2d2d7] py-2" />
      <div className='pb-2 text-sm'>
        {description}
      </div>
      <hr className="border-[#d2d2d7] py-2 block md:hidden" />
    </div>
  )
}

export default ProductInfo
