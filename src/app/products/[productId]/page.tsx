export const dynamic = 'force-dynamic';

import getCurrentUser from '@/app/actions/getCurrentUser';
import getProductById, { Params } from '@/app/actions/getProductById'
import EmptyState from '@/components/EmptyState';
import React from 'react'
import ProductClient from './ProductClient';

const ProductPage = async ({ params }: { params: Promise<Params> }) => {

  const resolvedParams = await params;

  const product = await getProductById(resolvedParams);
  const currentUser = await getCurrentUser();

  if (!product) {
    return (<EmptyState />);
  }

  return (
    <ProductClient 
      product={product}
      currentUser={currentUser}
    />
  )
}

export default ProductPage
