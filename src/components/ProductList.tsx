'use client'

import { useSearchParams } from 'next/navigation';
import EmptyState from '@/components/EmptyState';
import ProductCard from './ProductCard';
import { User } from '@/types/user';
import Pagination from './Pagination';
import { PRODUCTS_PER_PAGE } from '@/constants';

interface ProductListProps {
  products: {
    data: any[];
    totalItems: number;
  };
  currentUser: User | null;
}

const ProductList = ({ products, currentUser }: ProductListProps) => {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  const page = searchParams?.get('page');
  const pageNum = typeof page === 'string' ? Number(page) : 1;

  const filtered = category
    ? products.data.filter(product => product.category === category)
    : products.data;

  if (filtered.length === 0) {
    return <EmptyState />;
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-2 pt-12 
        sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6"
      >
        {filtered.map((product) => (
          <ProductCard
            key={product.id}
            currentUser={currentUser}
            data={product}
          />
        ))}
      </div>
      <Pagination 
        page={pageNum} 
        totalItems={products.totalItems}
        perPage={PRODUCTS_PER_PAGE}
      />
    </>
  );
}

export default ProductList;
