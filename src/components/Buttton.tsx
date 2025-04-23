import React from 'react'
import { IconType } from 'react-icons';

interface ButtonProps {
  label: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
}

const Buttton = ({
  label, onClick, disabled,
  outline, small, icon: Icon
}: ButtonProps) => {
  return (
    <button 
      type="submit"
      disabled={disabled}
      onClick={onClick}
      className={`
        relative w-full rounded-xl px-6
        ${small ? 'py-1.5 text-sm font-normal' : 'py-3 text-md font-medium'}
        ${outline 
          ? 'bg-white border border-[#dcdcdc] text-black hover:bg-[#f0f0f0]' 
          : 'bg-[#0071e3] text-white border border-transparent hover:bg-[#0076df]'}
        transition-all duration-200 ease-in-out
        disabled:opacity-50 disabled:cursor-not-allowed
      `}
    >
      {Icon && (
        <Icon size={20} className="absolute left-4 top-1/2 -translate-y-1/2" />
      )}
      {label}
    </button>
  )
}

export default Buttton;