'use client'
import { useSearchParams } from 'next/navigation';
import React from 'react'
import { BsWatch } from 'react-icons/bs';
import { FaComputer } from 'react-icons/fa6';
import { GiLargeDress } from 'react-icons/gi';
import { IoCarSport } from 'react-icons/io5';
import { MdLocalLaundryService, MdOutlineSportsTennis } from 'react-icons/md';
import { PiHairDryer } from 'react-icons/pi';
import { RiSofaLine } from 'react-icons/ri';
import CategoryBox from './CategoryBox';

export const categories = [
  {
    label: '디지털기기',
    path: 'digital',
    icon: FaComputer,
    description: '디지털기기 카테고리입니다.'
  },
  {
    label: '생활가전',
    path: 'appliances',
    icon: MdLocalLaundryService,
    description: '생활가전 카테고리입니다.'
  },
  {
    label: '가구/인테리어',
    path: 'interior',
    icon: RiSofaLine,
    description: '가구/인테리어 카테고리입니다.'
  },
  {
    label: '여성의류',
    path: 'women-clothing',
    icon: GiLargeDress,
    description: '여성의류 카테고리입니다.'
  },
  {
    label: '남성패션/잡화',
    path: 'men-fashion',
    icon: BsWatch,
    description: '남성패션/잡화 카테고리입니다.'
  },
  {
    label: '뷰티/미용',
    path: 'beauty',
    icon: PiHairDryer,
    description: '뷰티/미용 카테고리입니다.'
  },
  {
    label: '스포츠/레저',
    path: 'sports',
    icon: MdOutlineSportsTennis,
    description: '스포츠/레저 카테고리입니다.'
  },
  {
    label: '중고차',
    path: 'used-car',
    icon: IoCarSport,
    description: '중고차 카테고리입니다.'
  },
];

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get('category');

  return (
    <div className="overflow-x-auto w-full">
      <div className="flex flex-row justify-center gap-6 min-w-max mx-auto">
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            icon={item.icon}
            path={item.path}
            selected={category === item.path}
          />
        ))}
      </div>
    </div>
  );
};

export default Categories