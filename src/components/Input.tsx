import React, { useState } from 'react';
import { FieldErrors, FieldValues, UseFormRegister, Path } from 'react-hook-form';
import { FiSearch } from 'react-icons/fi';

interface InputProps<T extends FieldValues> {
  id: Path<T>;
  label?: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  validate?: (value: string) => true | string;
  onIconClick?: () => void;
  searchMode?: boolean;
}

const Input = <T extends FieldValues>({
  id, label, type = "text", disabled,
  formatPrice, register, required, errors, validate,
  onIconClick, searchMode = false
}: InputProps<T>) => {
  const [hasValue, setHasValue] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    setHasValue(!!e.target.value);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const shouldFloatLabel = label === "이름" || isFocused || hasValue;

  return (
    <div className="relative w-full">
      {formatPrice && (
        <span className="absolute text-neutral-700 top-5 left-2">₩</span>
      )}

      <input
        id={id}
        disabled={disabled}
        {...register(id, { required, validate })}
        placeholder=" "
        type={type}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`
          w-full ${searchMode ? 'pr-10' : 'px-4'} pt-4 pb-2 text-sm text-[#1d1d1f] rounded-xl
          border outline-none transition-all duration-200
          disabled:opacity-50 disabled:cursor-not-allowed
          ${formatPrice ? 'pl-10' : 'pl-4'}
          ${
            errors[id]
              ? 'border-rose-500 focus:border-rose-500 focus:ring-0'
              : 'border-[#494949] focus:border-[#0071e3] focus:ring-1 focus:ring-[#0071e3] focus:bg-white'
          }
        `}
      />

      {!formatPrice && (
        <label
          className={`
            absolute ${formatPrice ? 'left-10' : 'left-4'}
            text-base transition-all duration-200 transform origin-left
            pointer-events-none
            text-[#494949]
            ${errors[id] ? 'text-rose-500' : isFocused ? 'text-[#0071e3]' : ''}
            ${shouldFloatLabel
              ? 'scale-65 -translate-y-2 top-2.5'
              : 'scale-100 -translate-y-1/2 top-1/2'}
          `}
        >
          {label}
        </label>
      )}

      {searchMode && (
        <button
          type="submit"
          onClick={onIconClick}
          className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
        >
          <FiSearch size={16} />
        </button>
      )}

      {errors[id]?.message && (
        <p className="mt-1 text-sm text-rose-500">
          {String(errors[id]?.message)}
        </p>
      )}
    </div>
  );
};

export default Input;
