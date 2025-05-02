"use client";

import React, { useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Input from "@/components/Input";
import LocalNav from "@/components/nav/LocalNav";
import { signIn } from "next-auth/react";
import Button from "@/components/Button";

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (body) => {
    setIsLoading(true);
    try {
      const data = signIn("credentials", body);
      console.log(data);
    } catch (error) {
      console.log("로그인 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-[calc(100vh-56px)] bg-white place-items-center sm:px-10 lg:px-20">
      <LocalNav
        title="중고장터 계정"
        menuItems={[
          {
            label: "중고장터 계정 생성",
            onClick: () => router.push("/auth/register"),
          },
        ]}
      />
      <form onSubmit={handleSubmit(onSubmit)} className="w-80 sm:w-120 space-y-6 py-32">
        <h3 className="text-4xl font-bold text-center text-[#1d1d1f]">
          로그인
        </h3>
        <div className="text-md text-center font-medium text-[#1d1d1f]">
          아직 계정이 없으신가요?{" "}
          <Link
            href="/auth/register"
            className="text-[#0071e3] hover:underline"
          >
            회원가입
          </Link>
        </div>

        <Input
          id="email"
          label="이메일 주소"
          type="text"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          validate={(value: string) =>
            /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value) ||
            "유효한 이메일 주소를 입력해주세요."
          }
        />

        <Input
          id="password"
          label="암호"
          type="password"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          validate={(value: string) => {
            if (!value.trim()) return "비밀번호를 입력해주세요.";
            return true;
          }}
        />

        <Button label="로그인" disabled={isLoading} />
      </form>
    </section>
  );
};

export default LoginPage;
