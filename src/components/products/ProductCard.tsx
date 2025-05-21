"use client";
import { User } from "@/types/user";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import HeartButton from "../HeartButton";
import { fromNow } from "@/helpers/dayjs";
import { categories } from "@/components/categories/Categories";

interface ProductCardProps {
  data: any;
  currentUser: User | null;
}

const ProductCard = ({ data, currentUser }: ProductCardProps) => {

  const router = useRouter();

  const categoryLabel =
  categories.find((cat) => cat.path === data.category)?.label ?? "기타";

  const title =
  data.title.length > 12 ? `${data.title.slice(0, 12)}...` : data.title;

  return (
    <div
      onClick={() => router.push(`/products/${data.id}`)}
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col w-full gap-4 bg-[#f5f5f7] rounded-2xl transition-shadow duration-500 hover:shadow-xs">
        <div className="relative w-full overflow-hidden aspect-square rounded-t-2xl">
          <Image
            src={data.imageSrc}
            fill
            sizes="auto"
            className="object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-105"
            alt={`${data.title} image`}
            priority
          />
          <div className="absolute top-3 right-3">
            <HeartButton productId={data.id} currentUser={currentUser} />
          </div>
        </div>
        <div className="text-center pl-2 pr-2">
          <div className="text-lg font-semibold text-[#1d1d1f]">
            {title}
          </div>
          <div className="text-sm text-neutral-500">{categoryLabel}</div>
        </div>
        <div className="text-center space-y-1">
          <div className="text-base text-[#1d1d1f] font-medium">
            {data.price.toLocaleString()}원
          </div>
          <div className="text-xs text-neutral-400 pb-2">{fromNow(data.createdAt)}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
