'use client'
import { User } from '@/types/user';
import React from 'react'

interface ProductClientProps {
  product: any;
  currentUser: User | null;
}

const ProductClient = ({
  product, currentUser
}: ProductClientProps) => {
  return (
    <div>
      ProductClient
    </div>
  )
}

export default ProductClient
