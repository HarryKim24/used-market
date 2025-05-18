"use client";

import React, { useState } from "react";
import { User } from "@/types/user";
import { useForm, FieldValues } from "react-hook-form";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { formatTime } from "@/helpers/dayjs";
import DeleteConfirmModal from "@/components/DeleteConfirmModal";
import { signOut } from "next-auth/react";

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
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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
      deletePassword: "",
    },
  });

  const newPassword = watch("newPassword");

  const onSubmit = async (data: FieldValues) => {
    if (data.newPassword && data.newPassword !== data.confirmPassword) return;

    try {
      const response = await fetch("/api/profile/edit", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          currentPassword: data.currentPassword,
          newPassword: data.newPassword || undefined,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        alert(`업데이트 실패: ${errorText}`);
        return;
      }

      alert("회원정보가 성공적으로 수정되었습니다.");
      setIsEditing(false);
      reset();
      window.location.reload();
    } catch (error) {
      console.error("프로필 수정 오류:", error);
    }
  };

const handleDeleteAccount = async () => {
  const deletePassword = watch("deletePassword");
  if (!deletePassword) {
    alert("비밀번호를 입력해주세요.");
    return;
  }

  try {
    const res = await fetch("/api/profile/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword: deletePassword }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      alert(`${errorText}`);
      return;
    }

    alert("회원 탈퇴가 완료되었습니다.");

    await signOut({ callbackUrl: "/" });

  } catch (error) {
    console.error("회원 탈퇴 오류:", error);
  }
};

  if (!currentUser) return <div>유저 정보를 불러올 수 없습니다.</div>;

  return (
    <div className="w-60 sm:w-120 space-y-6 mx-auto">
      <div>
        <h2 className="text-xl font-semibold mb-2">회원 정보</h2>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold text-lg select-none">
            {currentUser.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-base font-semibold">{currentUser.name}</p>
            <p className="text-sm text-gray-600">{currentUser.email}</p>
          </div>
        </div>
        <p className="text-sm text-gray-600">
          <span className="font-medium">가입일:</span>{' '}
          {currentUser.createdAt ? formatTime(currentUser.createdAt) : '정보 없음'}
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {isEditing && (
          <>
            <Input
              id="name"
              label="이름"
              disabled={false}
              register={register}
              errors={errors}
              validate={(value: string) =>
                value && value !== currentUser.name ? validateName(value) : true
              }
            />
            <Input
              id="currentPassword"
              label="현재 비밀번호"
              type="password"
              register={register}
              errors={errors}
              validate={(value: string) =>
                newPassword?.trim() ? !!value.trim() || "현재 비밀번호를 입력해주세요." : true
              }
            />
            <Input
              id="newPassword"
              label="새 비밀번호"
              type="password"
              register={register}
              errors={errors}
              validate={(value: string) =>
                value?.trim() ? validatePassword(value) : true
              }
            />
            <Input
              id="confirmPassword"
              label="비밀번호 확인"
              type="password"
              register={register}
              errors={errors}
              validate={(value: string) =>
                newPassword?.trim() ? value === newPassword || "비밀번호가 일치하지 않습니다." : true
              }
            />
          </>
        )}

        <div className="flex justify-end gap-2">
          {isEditing ? (
            <>
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
            </>
          ) : (
            <div className="w-20">
              <Button label="수정" small onClick={() => setIsEditing(true)} />
            </div>
          )}
        </div>
      </form>

      <hr className="border-[#d2d2d7]" />

      <div className="text-right">
        <button
          onClick={() => setShowDeleteModal(true)}
          className="text-red-500 hover:underline text-sm px-3 cursor-pointer"
        >
          회원 탈퇴
        </button>
      </div>

      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteAccount}
        register={register}
        errors={errors}
      />
    </div>
  );
};

export default ProfileEdit;