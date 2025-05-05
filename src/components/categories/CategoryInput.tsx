import React from 'react'
import { IconType } from 'react-icons'

interface CategoryInputProps {
  icon: IconType;
  label: string;
  selected?: boolean;
  path: string;
  onClick: (value: string) => void;
}

const CategoryInput = ({
  icon: Icon, label, selected, onClick, path
}: CategoryInputProps) => {
  return (
    <div 
      onClick={() => onClick(path)}
      className={`
      rounded-xl border-1 pl-4 flex flex-row items-center gap-4
      transition cursor-pointer h-14 sm:h-16
      ${selected ? 'border-[#0071e3]' : 'border-neutral-500'}
      `}
    >
      <Icon size={30} />
      <div className='font-semibold text-xs sm:text-base'>
        {label}
      </div>
    </div>
  )
}

export default CategoryInput
