'use client'
import Button from '@/components/Button';
import { categories } from '@/components/categories/Categories';
import Container from '@/components/Container';
import ProductHead from '@/components/products/ProductHead';
import ProductInfo from '@/components/products/ProductInfo';
import { User } from '@/types/user';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import React from 'react'

interface ProductClientProps {
  product: any;
  currentUser: User | null;
}

const ProductClient = ({
  product, currentUser
}: ProductClientProps) => {

  const router = useRouter();

  const KakaoMap = dynamic(() => import('../../../components/kakao/KakaoMap'), {
    ssr: false
  });

  const category = categories.find((item) => item.path === product.category);

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className='flex flex-col gap-6'>
          <ProductHead
            title={product.title}
            imageSrc={product.imageSrc}
            id={product.id}
            currentUser={currentUser}
            userId={product.userId}
          />
          <div
            className='grid grid-cols-1 mt-6 md:grid-cols-2 md:gap-10'
          >
            <ProductInfo
              user={product.user}
              category={category!}
              createdAt={product.createdAt}
              description={product.description}
            />
            <div>
              <KakaoMap 
                detailPage
                latitude={product.latitude}
                longitude={product.longitude}
              />
            </div>
          </div>
        </div>
        <div className="mt-10 flex justify-between items-center">
          <div className="text-xl font-bold text-[#1d1d1f]">
            {product.price.toLocaleString()}원
          </div>
          <div className="w-30">
            <Button
              label="채팅하기"
              onClick={() => router.push("/chat")}
            />
          </div>
        </div>
      </div>
    </Container>
  )
}

export default ProductClient
