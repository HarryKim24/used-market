"use client";

import React, { useState } from "react";
import { User } from "@/types/user";
import { useForm, FieldValues } from "react-hook-form";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { formatTime } from "@/helpers/dayjs";

interface ProfileEditProps {
  currentUser: User | null;
}

const NAME_REGEX = /^(?=.*[a-zA-Z가-힣])[a-zA-Z가-힣0-9]{2,}$/;
const PASSWORD_REGEX = /^(?=.*[a-zA-Z])[a-zA-Z0-9]{8,}$/;

const validateName = (value: string) =>
  NAME_REGEX.test(value) || "이름은 한글 또는 영문을 포함해야 하며, 2자 이상이어야 합니다.";

const validatePassword = (value: string) => {
  if (!value.trim()) return "비밀번호를 입력해주세요.";
  if (!PASSWORD_REGEX.test(value)) {
    return "비밀번호는 8자 이상이어야 하며, 영문을 반드시 포함해야 합니다.";
  }
  return true;
};


const ProfileEdit = ({ currentUser }: ProfileEditProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: currentUser?.name || "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const newPassword = watch("newPassword");

  const onSubmit = async (data: FieldValues) => {
    if (data.newPassword && data.newPassword !== data.confirmPassword) {
      return;
    }
  
    try {
      const response = await fetch("/api/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          currentPassword: data.currentPassword,
          newPassword: data.newPassword || undefined,
        }),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.log(`업데이트 실패: ${errorText}`);
        return;
      }
  
      alert("회원정보가 성공적으로 수정되었습니다.");
      setIsEditing(false);
      reset({
        name: data.name,
        newPassword: "",
        confirmPassword: "",
      });
      window.location.reload();
    } catch (error) {
      console.error("프로필 수정 오류:", error);
    }
  };
  
  const handleDeleteAccount = () => {
    const confirmDelete = confirm("정말 회원 탈퇴하시겠습니까?");
    if (confirmDelete) {
      console.log("회원 탈퇴 진행");
    }
  };

  if (!currentUser) {
    return <div>유저 정보를 불러올 수 없습니다.</div>;
  }

  return (
    <div className="w-60 sm:w-120 space-y-6 mx-auto">
      <div>
        <h2 className="text-xl font-semibold mb-2">회원 정보</h2>

        {!isEditing && (
          <p>
            <span className="font-medium">이름:</span> {currentUser.name}
          </p>
        )}
        <p>
          <span className="font-medium">이메일:</span> {currentUser.email}
        </p>
        <p>
          <span className="font-medium">가입일:</span>{" "}
          {currentUser.createdAt ? formatTime(currentUser.createdAt) : "정보 없음"}
        </p>
      </div>

      <form 
        className="space-y-6" 
        onSubmit={handleSubmit(onSubmit)}
      >
        {isEditing && (
          <Input
            id="name"
            label="이름"
            disabled={false}
            register={register}
            errors={errors}
            validate={(value: string) => {
              if (value && value !== currentUser.name) {
                return validateName(value);
              }
              return true;
            }}
          />
        )}

        {isEditing && (
          <>
            <Input
              id="currentPassword"
              label="현재 비밀번호"
              type="password"
              register={register}
              errors={errors}
              validate={(value: string) => {
                if (newPassword?.trim()) {
                  return value.trim() !== "" || "현재 비밀번호를 입력해주세요.";
                }
                return true;
              }}
            />
            <Input
              id="newPassword"
              label="새 비밀번호"
              type="password"
              register={register}
              errors={errors}
              validate={(value: string) => {
                if (value?.trim()) {
                  return validatePassword(value);
                }
                return true;
              }}
            />
              <Input
                id="confirmPassword"
                label="비밀번호 확인"
                type="password"
                register={register}
                errors={errors}
                validate={(value: string) => {
                  if (newPassword?.trim()) {
                    return value === newPassword || "비밀번호가 일치하지 않습니다.";
                  }
                  return true;
                }}
              />
          </>
        )}

        {isEditing ? (
          <div className="flex justify-end gap-2">
            <div className="w-100 sm:w-1000" />
            <Button
              label="취소"
              outline
              small
              onClick={() => {
                setIsEditing(false);
                reset();
              }}
            />
            <Button label="저장" small />
          </div>

        ) : (
          <div className="w-full flex justify-end">
            <div className="w-20">
              <Button
                label="수정"
                small
                onClick={() => setIsEditing(true)}
              />
            </div>
          </div>
        )}
      </form>

      <hr className="border-[#d2d2d7]" />

      <div className="text-right">
        <button
          onClick={handleDeleteAccount}
          className="text-red-500 hover:underline text-sm px-3 cursor-pointer"
        >
          회원 탈퇴
        </button>
      </div>
    </div>
  );
};

export default ProfileEdit;
