import Link from 'next/link';
import React from 'react'
import { IconType } from 'react-icons'

interface CategoryBoxProps {
  icon: IconType;
  label: string;
  path: string;
  selected?: boolean;
}

const CategoryBox = ({
  icon: Icon, label, path, selected
}: CategoryBoxProps) => {
  return (
    <Link href={`/?category=${path}`}>
      <div
        className={`
          flex flex-col items-center justify-center px-3 py-2
          rounded-xl transition hover:text-neutral-700 
          ${selected ? 'text-neutral-700' : 'text-neutral-500'}
        `}
      >
        <Icon size={28} className="mb-1" />
        <span className="text-sm truncate">{label}</span>
      </div>
    </Link>
  )
}

export default CategoryBox
