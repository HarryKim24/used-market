'use client'
import Buttton from '@/components/Buttton';
import Container from '@/components/Container';
import ImageUpload from '@/components/ImageUpload';
import Input from '@/components/Input';
import React, { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

const ProductUploadPage = () => {

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: {
      errors,
    },
    reset
  } = useForm<FieldValues>({
    defaultValues: {
      title: '',
      description: '', 
      category: '',
      latitude: 33.5563,
      longitude: 126.7958,
      imageSrc: '',
      price: 0,
    }
  })

  const imageSrc = watch('imageSrc');

  const onSubmit: SubmitHandler<FieldValues> = (data) => {

  }

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value);
  }

  return (
    <Container>
      <div
        className='w-120 max-w-screen-lg mx-auto'
      >
        <form
          className='flex flex-col gap-8'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='flex flex-col gap-2'>
            <h4 className='text-md font-medium'>이미지 등록</h4>
            <ImageUpload 
              onChange={(value) => setCustomValue('imageSrc', value)}
              value={imageSrc} 
            />
          </div>
          <div className='flex flex-col gap-2'>
            <h4 className='text-md font-medium'>제목</h4>
            <Input
              id='title'
              label='글 제목'
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
          </div>
          <hr className='border-[#d2d2d7] py-2' />
        
          <div className='flex flex-col gap-2'>
            <h4 className='text-md font-medium'>자세한 설명</h4>
            <Input
              id='description'
              label='신뢰할 수 있는 거래를 위해 자세히 적어주세요.'
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
          </div>
          <hr className='border-[#d2d2d7] py-2' />
        
          <div className='flex flex-col gap-2'>
            <h4 className='text-md font-medium'>판매 가격</h4>
            <Input
              id='price'
              label='가격'
              formatPrice
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
          </div>
          <hr className='border-[#d2d2d7] py-2' />
    
          <div
            className='grid grid-cols-1 md:grid-cols-2 gap-3
              max-h-[50vh] overflow-y-auto
            ' 
          >
            {/* Category */}
          </div>
          <hr className='border-[#d2d2d7] py-2' />
          {/* KakaoMap */}
        <Buttton label='등록' />
        </form>
      </div>
    </Container>
  )
}

export default ProductUploadPage;