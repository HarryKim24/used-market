"use client";

import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import Input from "@/components/Input";
import LocalNav from "@/components/nav/LocalNav";
import axios from "axios";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";

const NAME_REGEX = /^(?=.*[a-zA-Z가-힣])[a-zA-Z가-힣0-9]{2,}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PASSWORD_REGEX = /^(?=.*[a-zA-Z])[a-zA-Z0-9]{8,}$/;

const validateName = (value: string) =>
  NAME_REGEX.test(value) || "이름은 한글 또는 영문을 포함해야 하며, 2자 이상이어야 합니다.";

const validateEmail = (value: string) =>
  EMAIL_REGEX.test(value) || "유효한 이메일 주소를 입력해주세요.";

const validatePassword = (value: string) => {
  if (!value.trim()) return "비밀번호를 입력해주세요.";
  if (!PASSWORD_REGEX.test(value)) {
    return "비밀번호는 8자 이상이어야 하며, 영문을 반드시 포함해야 합니다.";
  }
  return true;
};

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");

  const onSubmit: SubmitHandler<FieldValues> = async (body) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const { data } = await axios.post("/api/register", body);
      if (data?.success) {
        router.push("/auth/login");
      }
    } catch (error: any) {
      const msg = error.response?.data || "알 수 없는 오류가 발생했습니다.";
      setErrorMessage(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-[calc(100vh-56px)] bg-white place-items-center sm:px-10 lg:px-20">
      <LocalNav
        title="중고장터 계정"
        menuItems={[{ label: "로그인", onClick: () => router.push("/auth/login") }]}
      />
      <form onSubmit={handleSubmit(onSubmit)} className="w-80 sm:w-120 space-y-6 py-8">
        <h3 className="text-4xl font-bold text-center text-[#1d1d1f]">회원가입</h3>

        <div className="text-md text-center font-medium text-[#1d1d1f]">
          중고장터 계정을 가지고 계십니까?{" "}
          <Link href="/auth/login" className="text-[#0071e3] hover:underline">
            로그인
          </Link>
        </div>

        {errorMessage && (
          <div className="text-md text-red-500 text-center">{errorMessage}</div>
        )}

        <Input
          id="name"
          label="이름"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          validate={validateName}
        />

        <hr className="border-[#d2d2d7] py-2" />

        <Input
          id="email"
          label="name@example.com"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          validate={validateEmail}
        />

        <p className="text-sm">새 중고장터 계정으로 사용될 아이디입니다.</p>

        <hr className="border-[#d2d2d7] py-2" />

        <Input
          id="password"
          label="암호"
          type="password"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          validate={validatePassword}
        />

        <Input
          id="confirmPassword"
          label="암호 재입력"
          type="password"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          validate={(value: string) =>
            value === password || "비밀번호가 일치하지 않습니다."
          }
        />

        <Button label="계속" disabled={isLoading} />
      </form>
    </section>
  );
};

export default RegisterPage;
