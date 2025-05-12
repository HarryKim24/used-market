'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import ProfileEdit from './ProfileEdit';
import FavoriteProducts from './FavoriteProducts';
import ProductList from './ProductList';

const tabs = ['프로필', '관심 목록', '판매 내역'];

export default function ProfileContent({ currentUser, products }: any) {
  const [activeTab, setActiveTab] = useState('프로필');
  const router = useRouter();
  const pathname = usePathname();

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);

    if (tab !== '판매 내역') {
      router.replace(pathname);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case '프로필':
        return <ProfileEdit />;
      case '관심 목록':
        return <FavoriteProducts />;
      case '판매 내역':
        return (
          <ProductList
            products={{ data: products, totalItems: products.length }}
            currentUser={currentUser}
            searchDisabled
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex gap-4 mt-4">
      <div className="w-40 flex flex-col gap-2">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => handleTabClick(tab)}
            className={`py-2 px-4 font-bold hover:text-[#0071e3] ${activeTab === tab ? 'text-[#0071e3]' : ''}`}

          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex-1">
        {renderContent()}
      </div>
    </div>
  );
}
