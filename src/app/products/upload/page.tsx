"use client";
import Button from "@/components/Button";
import { categories } from "@/components/categories/Categories";
import CategoryInput from "@/components/categories/CategoryInput";
import Container from "@/components/Container";
import Input from "@/components/Input";
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import LocalNav from "@/components/nav/LocalNav";
import Textarea from "@/components/Textarea";

const ImageUpload = dynamic(() => import("@/components/ImageUpload"), {
  ssr: false,
  loading: () => (
    <div
      className="
        relative flex flex-col items-center justify-center gap-4 p-20
        border border-dashed rounded-xl
        border-[#1d1d1f] bg-neutral-100 animate-pulse
        text-neutral-400
      "
    >
      <div className="w-12 h-12 bg-neutral-300 rounded-md" />
      <div className="w-32 h-4 bg-neutral-300 rounded" />
    </div>
  ),
});



const ProductUploadPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      description: "",
      category: "",
      latitude: 37.39542,
      longitude: 127.11046,
      imageSrc: "",
      price: 0,
    },
  });

  const imageSrc = watch("imageSrc");
  const category = watch("category");

  const latitude = watch("latitude");
  const longitude = watch("longitude");

  const KakaoMap = dynamic(() => import("@/components/kakao/KakaoMap"), {
    ssr: false,
    loading: () => (
      <div
        className="
          w-full h-[300px] rounded-lg bg-neutral-100 border border-dashed border-[#1d1d1f]
          animate-pulse flex items-center justify-center text-neutral-400
        "
      >
        <div className="text-sm">지도를 불러오는 중...</div>
      </div>
    ),
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/products", data)
      .then((response) => {
        router.push(`/products/${response.data.id}`);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value);
  };

  return (
    <Container>
      <LocalNav title="상품 업로드" />
      <div className="max-w-120 mx-auto mt-6">
        <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2">
            <h4 className="text-md font-medium">이미지 등록</h4>
            <ImageUpload
              onChange={(value) => setCustomValue("imageSrc", value)}
              value={imageSrc}
            />
          </div>
          <hr className="border-[#d2d2d7] py-2" />
          <div className="flex flex-col gap-2">
            <h4 className="text-md font-medium">제목</h4>
            <Input
              id="title"
              label="글 제목"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-md font-medium">자세한 설명</h4>
            <Textarea
              id="description"
              label="신뢰할 수 있는 거래를 위해 자세히 적어주세요."
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-md font-medium">판매 가격</h4>
            <Input
              id="price"
              label="가격"
              formatPrice
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
          </div>
          <hr className="border-[#d2d2d7] py-2" />

          <div className="flex flex-col gap-2">
            <h4 className="text-md font-medium">카테고리</h4>
            <div
              className="grid grid-cols-2 gap-3
            max-h-[50vh] overflow-y-auto
            "
            >
              {categories.map((item) => (
                <div key={item.label} className="col-span-1">
                  <CategoryInput
                    onClick={(category) => setCustomValue("category", category)}
                    selected={category === item.path}
                    label={item.label}
                    icon={item.icon}
                    path={item.path}
                  />
                </div>
              ))}
            </div>
          </div>
          <hr className="border-[#d2d2d7] py-2" />

          <div className="flex flex-col gap-2">
            <h4 className="text-md font-medium">위치</h4>
            <KakaoMap
              setCustomValue={setCustomValue}
              latitude={latitude}
              longitude={longitude}
            />
          </div>
          <hr className="border-[#d2d2d7] py-2" />

          <Button label="등록" />
        </form>
      </div>
    </Container>
  );
};

export default ProductUploadPage;
