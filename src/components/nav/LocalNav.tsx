import React from 'react'

interface LocalNavProps {
  title: string
  menuItems?: { label: string; onClick?: () => void }[]
}

const LocalNav: React.FC<LocalNavProps> = ({ title, menuItems }) => {
  return (
    <div className="flex w-full border-b border-[#d2d2d7] bg-white py-2 justify-between items-center">
      <h2 className="text-2xl font-bold text-[#1d1d1f]">{title}</h2>
      <div className="flex gap-2 text-sm font-normal text-[#1d1d1f]">
      {menuItems?.map((item, index) => (
        <div
          key={index}
          className={`
            cursor-pointer transition 
            ${item.label === "삭제" ? "text-rose-500" : "hover:text-[#0071e3]"} 
            ${index === menuItems.length - 1 ? "mx-5" : ""}
          `}
          onClick={item.onClick}
        >
          {item.label}
        </div>
      ))}
      </div>
    </div>
  )
}

export default LocalNav
