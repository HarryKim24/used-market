"use client";

import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import Button from "@/components/Button";

interface ModalProps {
  isOpen: boolean;
  title: string;
  description?: string;
  actionLabel: string;
  onClose: () => void;
  onSubmit: () => void;
  children: React.ReactNode;
}

const Modal = ({
  isOpen,
  title,
  description,
  actionLabel,
  onClose,
  onSubmit,
  children,
}: ModalProps) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div
        className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        {description && <p className="text-sm text-gray-600 mb-4">{description}</p>}
  
        <div className="mb-4">{children}</div>
  
        <div className="flex justify-end gap-2">
          <div className="w-20">
            <Button label="취소" outline small onClick={onClose} />
          </div>
          <div className="w-20">
            <Button label={actionLabel} small onClick={onSubmit} />
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;