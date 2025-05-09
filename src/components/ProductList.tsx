"use client";

import { useSearchParams } from "next/navigation";
import EmptyState from "@/components/EmptyState";
import ProductCard from "./products/ProductCard";
import { User } from "@/types/user";
import Pagination from "./Pagination";
import { PRODUCTS_PER_PAGE } from "@/constants";

interface ProductListProps {
  products: {
    data: any[];
    totalItems: number;
  };
  currentUser: User | null;
}

const ProductList = ({ products, currentUser }: ProductListProps) => {
  const searchParams = useSearchParams();

  const pageParam = searchParams.get("page");
  const category = searchParams.get("category");

  const page = typeof pageParam === "string" ? Number(pageParam) : 1;
  const filtered = category
    ? products.data.filter((item) => item.category === category)
    : products.data;

  const paged = filtered.slice(
    (page - 1) * PRODUCTS_PER_PAGE,
    page * PRODUCTS_PER_PAGE
  );

  if (paged.length === 0) return <EmptyState />;

  return (
    <>
      <div
        className="grid grid-cols-1 gap-2 pt-12 px-2
        sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6"
      >
        {paged.map((product) => (
          <ProductCard
            key={product.id}
            currentUser={currentUser}
            data={product}
          />
        ))}
      </div>

      <Pagination
        page={page}
        totalItems={filtered.length}
        perPage={PRODUCTS_PER_PAGE}
      />
    </>
  );
};

export default ProductList;
