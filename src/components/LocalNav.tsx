import React from 'react'

interface LocalNavProps {
  title: string
  menuItems: { label: string; onClick?: () => void }[]
}

const LocalNav: React.FC<LocalNavProps> = ({ title, menuItems }) => {
  return (
    <div className="flex w-full border-b border-[#d2d2d7] bg-white py-2 justify-between items-center">
      <h2 className="text-xl font-bold text-[#1d1d1f] mx-5 sm:mx-0">{title}</h2>
      <div className="flex gap-2 text-xs font-medium text-[#1d1d1f]">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className={`hover:text-[#0071e3] cursor-pointer transition ${
              index === menuItems.length - 1 ? 'mx-5' : ''
            }`}
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
