"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Input from "@/components/Input";
import LocalNav from "@/components/nav/LocalNav";
import { signIn } from "next-auth/react";
import Button from "@/components/Button";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const validateEmail = (value: string) =>
  EMAIL_REGEX.test(value) || "유효한 이메일 주소를 입력해주세요.";

const validatePassword = (value: string) =>
  value.trim() !== "" || "비밀번호를 입력해주세요.";

function ErrorMessageFromParams() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  let message = "";
  switch (error) {
    case "CredentialsSignin":
    case "InvalidCredentials":
      message = "이메일 또는 비밀번호가 올바르지 않습니다.";
      break;
    case "MissingCredentials":
      message = "이메일과 비밀번호를 모두 입력해주세요.";
      break;
  }

  return message ? (
    <div className="text-md text-red-500 text-center">{message}</div>
  ) : null;
}

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
      await signIn("credentials", {
        ...body,
        callbackUrl: "/",
      });
    } catch {
      // fallback error 처리
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-[calc(100vh-56px)] bg-white justify-center items-center sm:px-10 lg:px-20">
      <LocalNav
        title="중고장터 계정"
        menuItems={[
          {
            label: "중고장터 계정 생성",
            onClick: () => router.push("/auth/register"),
          },
        ]}
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-60 sm:w-120 space-y-6 py-32 mx-auto"
      >
        <h3 className="text-4xl font-bold text-center text-[#1d1d1f]">로그인</h3>

        <div className="text-md text-center font-medium text-[#1d1d1f]">
          아직 계정이 없으신가요?{" "}
          <Link href="/auth/register" className="text-[#0071e3] hover:underline">
            회원가입
          </Link>
        </div>

        <Suspense fallback={null}>
          <ErrorMessageFromParams />
        </Suspense>

        <Input
          id="email"
          label="이메일 주소"
          type="text"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          validate={validateEmail}
        />
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

        <Button label="로그인" disabled={isLoading} />
      </form>
    </section>
  );
};

export default LoginPage;