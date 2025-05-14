'use client';

import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import React, { useCallback, useState } from 'react';
import { TbPhotoPlus } from 'react-icons/tb';

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}

const ImageUpload = ({ onChange, value }: ImageUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = useCallback((result: any) => {
    setIsUploading(false);
    onChange(result.info.secure_url);
  }, [onChange]);

  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  return (
    <CldUploadWidget
      onUpload={() => setIsUploading(true)}
      onSuccess={handleUpload}
      uploadPreset={uploadPreset}
      options={{ maxFiles: 1 }}
    >
      {({ open }) => (
        <div
          role="button"
          onClick={() => !isUploading && open?.()}
          className={`
            relative flex flex-col items-center justify-center gap-4 p-20
            transition border border-dashed rounded-xl cursor-pointer
            text-neutral-500 border-[#1d1d1f] overflow-hidden
            hover:bg-neutral-100
            ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}
          `}
          aria-disabled={isUploading}
        >
          <TbPhotoPlus size={50} />
          <div className="text-sm">{isUploading ? '업로드 중...' : '이미지를 선택하세요'}</div>
          {value && !isUploading && (
            <div className="absolute inset-0 w-full h-full">
              <Image
                src={value}
                alt="업로드된 이미지"
                fill
                style={{ objectFit: 'cover' }}
                sizes="100vw"
              />
            </div>
          )}
        </div>
      )}
    </CldUploadWidget>
  );
};

export default React.memo(ImageUpload);
