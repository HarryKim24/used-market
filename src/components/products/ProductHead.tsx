'use client';

import { User } from '@/types/user';
import React from 'react';
import LocalNav from '../nav/LocalNav';
import Image from 'next/image';
import HeartButton from '../HeartButton';
import { useRouter } from 'next/navigation';

interface ProductHeadProps {
  title: string;
  imageSrc: string;
  id: string;
  currentUser?: User | null;
  userId?: string;
}

const ProductHead = ({
  title, imageSrc, id, currentUser, userId,
}: ProductHeadProps) => {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmDelete = confirm("정말 삭제하시겠습니까?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("삭제 실패");
      }

      alert("삭제되었습니다.");
      router.push("/");
    } catch (error) {
      alert("삭제 중 오류가 발생했습니다.");
      console.error("삭제 실패:", error);
    }
  };

  return (
    <>
      <LocalNav 
        title={title} 
        menuItems={
          currentUser?.id === userId
            ? [
                {
                  label: "삭제",
                  onClick: handleDelete,
                }
              ]
            : undefined
        }
      />
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
  );
};

export default ProductHead;
