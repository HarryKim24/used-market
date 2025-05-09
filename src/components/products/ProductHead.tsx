'use client';

import { User } from '@/types/user';
import React, { useState } from 'react';
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
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        className="w-full h-[35vh] md:h-[70vh] overflow-hidden rounded-xl relative bg-neutral-300 cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <Image
          src={imageSrc}
          fill
          className="object-cover w-full"
          alt={`${title} image`}
        />
        <div className="absolute top-5 right-5">
          <HeartButton
            productId={id}
            currentUser={currentUser}
          />
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center"
          onClick={() => setIsModalOpen(false)}
        >
          <div className="relative w-auto max-w-3xl bg-neutral-500/80 max-h-[90vh] rounded-lg overflow-hidden shadow-lg">
            <Image
              src={imageSrc}
              alt="Full view"
              width={800}
              height={800}
              className="object-contain max-w-full max-h-[90vh]"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ProductHead;
