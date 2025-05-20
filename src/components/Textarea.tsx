"use client";
import React, { useState } from "react";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

interface TextareaProps<T extends FieldValues> {
  id: Path<T>;
  label?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  validate?: (value: string) => true | string;
}

const Textarea = <T extends FieldValues>({
  id,
  label,
  disabled,
  required,
  register,
  errors,
  validate,
}: TextareaProps<T>) => {
  const [hasValue, setHasValue] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(false);
    setHasValue(!!e.target.value);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const shouldFloatLabel = isFocused || hasValue;

  return (
    <div className="relative w-full">
      <textarea
        id={id}
        {...register(id, { required, validate })}
        disabled={disabled}
        placeholder=" "
        rows={5}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`
          w-full px-4 pt-6 pb-2 text-sm text-[#1d1d1f] rounded-xl resize-none
          border outline-none transition-all duration-200
          disabled:opacity-50 disabled:cursor-not-allowed
          ${
            errors[id]
              ? 'border-rose-500 focus:border-rose-500 focus:ring-0'
              : 'border-[#494949] focus:border-[#0071e3] focus:ring-1 focus:ring-[#0071e3] focus:bg-white'
          }
        `}
      />

      {label && (
        <label
          htmlFor={id}
          className={`
            absolute left-4 text-base transition-all duration-200 transform origin-left
            pointer-events-none text-[#494949]
            ${errors[id] ? 'text-rose-500' : isFocused ? 'text-[#0071e3]' : ''}
            ${shouldFloatLabel
              ? 'scale-65 -translate-y-2 top-2.5'
              : 'scale-100 -translate-y-1/2 top-6'}
          `}
        >
          {label}
        </label>
      )}

      {errors[id]?.message && (
        <p className="mt-1 text-sm text-rose-500">
          {String(errors[id]?.message)}
        </p>
      )}
    </div>
  );
};

export default Textarea;