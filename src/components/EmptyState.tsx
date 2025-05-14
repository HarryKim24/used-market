"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Button from "./Button";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  hideReset?: boolean;
}

const EmptyState = ({
  title = "일치하는 상품이 없습니다.",
  subtitle = "일부 필터를 변경하거나 제거해 보세요.",
  hideReset = false,
}: EmptyStateProps) => {
  const router = useRouter();

  return (
    <div className="min-h-[calc(100vh-56px-45px-48px-80px-32px-24px-12px)] mt-20 flex flex-col gap-4 items-center">
      <p className="text-2xl sm:text-3xl font-bold">{title}</p>
      <p className="text-md sm:text-xl font-medium">{subtitle}</p>
      {!hideReset && (
        <div className="mt-4 rounded-full overflow-hidden">
          <Button label="모든 필터 제거" onClick={() => router.push("/")} />
        </div>
      )}
    </div>
  );
};

export default EmptyState;
