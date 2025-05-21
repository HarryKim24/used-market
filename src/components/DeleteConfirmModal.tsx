"use client";

import React from "react";
import Modal from "@/components/Modal";
import Input from "@/components/Input";
import { FieldErrors, UseFormRegister, FieldValues } from "react-hook-form";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  isLoading?: boolean;
}

const DeleteConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  register,
  errors,
  isLoading = false,
}: DeleteConfirmModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      title="회원 탈퇴"
      description="정말 탈퇴하시겠습니까? 현재 비밀번호를 입력해주세요."
      actionLabel="탈퇴"
      onClose={onClose}
      onSubmit={onConfirm}
    >
      <Input
        id="deletePassword"
        label="현재 비밀번호"
        type="password"
        register={register}
        errors={errors}
        required
        disabled={isLoading}
      />
    </Modal>
  );
};

export default DeleteConfirmModal;