'use client'
import Buttton from '@/components/Buttton';
import Container from '@/components/Container';
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
      imageSSrc: '',
      price: 0,
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {

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
          <Input
            id='title'
            label='제목'
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <hr className='border-[#d2d2d7] py-2' />
          <Input
            id='description'
            label='설명'
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <hr className='border-[#d2d2d7] py-2' />
          <Input
            id='price'
            label='가격'
            formatPrice
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
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