'use client'
import Input from '@/components/Input';
import React, { useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form';

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

  return (
    <div>
      <Input
        id='title'
        label='제목'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <hr />
      <Input
        id='description'
        label='설명'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <hr />
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
  )
}

export default ProductUploadPage;