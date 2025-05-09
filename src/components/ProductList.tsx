"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import EmptyState from "@/components/EmptyState";
import ProductCard from "./products/ProductCard";
import { User } from "@/types/user";
import Pagination from "./Pagination";
import { PRODUCTS_PER_PAGE } from "@/constants";
import Input from "./Input";
import Button from "./Button";

interface ProductListProps {
  products: {
    data: any[];
    totalItems: number;
  };
  currentUser: User | null;
}

const ProductList = ({ products, currentUser }: ProductListProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const pageParam = searchParams.get("page");
  const category = searchParams.get("category");
  const searchQuery = searchParams.get("search") || "";
  const page = typeof pageParam === "string" ? Number(pageParam) : 1;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      search: searchQuery,
    },
  });

  useEffect(() => {
    setValue("search", searchQuery);
  }, [searchQuery, setValue]);

  const onSearch = (data: any) => {
    const params = new URLSearchParams(searchParams.toString());

    if (data.search) {
      params.set("search", data.search);
    } else {
      params.delete("search");
    }

    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  const filtered = products.data.filter((item) => {
    const matchesCategory = category ? item.category === category : true;
    const matchesSearch = item.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const paged = filtered.slice(
    (page - 1) * PRODUCTS_PER_PAGE,
    page * PRODUCTS_PER_PAGE
  );

  if (paged.length === 0) return <EmptyState />;

  return (
    <>
      <form
        onSubmit={handleSubmit(onSearch)}
        className="px-2 pt-6 max-w-2xl mx-auto w-full"
      >
        <div className="h-full w-60 sm:w-80 md:w-100 lg:w-120 mx-auto">
          <Input
            id="search"
            label="상품 검색"
            register={register}
            errors={errors}
            searchMode
          />
        </div>
      </form>

      <div
        className="grid grid-cols-1 gap-3 pt-8 px-4
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
