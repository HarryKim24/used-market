"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import ProfileEdit from "../../components/ProfileEdit";
import ProductList from "../../components/ProductList";
import { User } from "@/types/user";

interface ProfileClientProps {
  currentUser: User | null;
  products: any;
  favoriteProducts: any;
}

const tabs = ["프로필", "관심 목록", "판매 내역"];

const ProfileClient = ({ currentUser, products, favoriteProducts }: ProfileClientProps) => {
  const [activeTab, setActiveTab] = useState("프로필");
  const router = useRouter();
  const pathname = usePathname();

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);

    if (tab !== "판매 내역") {
      router.replace(pathname);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "프로필":
        return <ProfileEdit />;
      case "관심 목록":
        return (
          <ProductList
            products={{
              data: favoriteProducts,
              totalItems: favoriteProducts.length,
            }}
            currentUser={currentUser}
            searchDisabled
          />
        );
      case "판매 내역":
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
    <div className="flex gap-4 mt-4 flex-col sm:flex-row">
      <div className="w-full sm:w-40 flex flex-row sm:flex-col gap-2 justify-center sm:justify-start">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabClick(tab)}
            className={`py-2 px-4 font-bold cursor-pointer hover:text-[#0071e3] ${
              activeTab === tab ? "text-[#0071e3]" : ""
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex-1">{renderContent()}</div>
    </div>
  );
};

export default ProfileClient;
