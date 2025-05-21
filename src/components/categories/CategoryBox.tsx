import Link from 'next/link';
import React from 'react';
import { IconType } from 'react-icons';

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
          flex flex-col items-center justify-center
          px-2 py-1.5
          sm:px-3 md:py-2
          rounded-lg transition
          hover:text-neutral-700
          ${selected ? 'text-neutral-700' : 'text-neutral-500'}
        `}
      >
        <Icon
          className="mb-1 text-[20px] md:text-[24px]"
        />
        <span className="text-xs md:text-sm truncate text-center">{label}</span>
      </div>
    </Link>
  );
};

export default CategoryBox;
