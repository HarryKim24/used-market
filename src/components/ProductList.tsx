'use client'

import { useSearchParams } from 'next/navigation';
import EmptyState from '@/components/EmptyState';
import ProductCard from './ProductCard';
import { User } from '@/types/user';

interface ProductListProps {
  products: any[];
  currentUser: User | null;
}

const ProductList = ({ products, currentUser }: ProductListProps) => {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');

  const filtered = category
    ? products.filter(product => product.category === category)
    : products;

  if (filtered.length === 0) {
    return <EmptyState />;
  }

  return (
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
  );
}

export default ProductList;
