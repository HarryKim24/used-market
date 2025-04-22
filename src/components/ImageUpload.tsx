import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import React from 'react'
import { TbPhotoPlus } from 'react-icons/tb';

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}

const ImageUpload = ({
  onChange, value
}: ImageUploadProps) => {

  const handleUpload = (result: any) => {
    console.log('result', result);
    onChange(result.info.secure_url);
  }

  return (
    <CldUploadWidget
      onSuccess={handleUpload}
      uploadPreset={'eqaijeo'}
      options={{ maxFiles: 1 }}
    >
      {({ open }) => {
        return (
          <div 
            onClick={() => open?.()}
            className='
              relative flex flex-col items-center justify-center gap-4 p-20
              transition border-1 border-dashed rounded-xl cursor-pointer
              text-neutral-500 border-[#1d1d1f]
            '
          >
            <TbPhotoPlus size={50} />
            {value && (
              <div className='absolute inset-0 w-full h-full'>
                <Image
                  fill style={{ objectFit: 'cover' }}
                  src={value} alt=''
                />
              </div>
            )}
          </div>
        )
      }}
    </CldUploadWidget>
  )
}

export default ImageUpload
