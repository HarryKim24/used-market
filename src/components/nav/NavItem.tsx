import Link from 'next/link'
import React from 'react'

const NavItem = ({ mobile }: { mobile?: boolean }) => {
  return (
    <div className={`
      w-full 
      ${mobile ? "flex justify-start items-start h-[calc(100vh-56px)] p-6" : ""}
    `}>
      <ul 
        className={`
          text-md flex gap-4 
          ${mobile ? "flex-col items-start w-full pl-4" : "items-center justify-center"}
        `}
      >
        <li className={`${mobile ? 'text-3xl w-full' : 'w-16'} py-2 font-[500] hover:font-[600] text-left cursor-pointer`}>
          <Link href='/profile'>프로필</Link>
        </li>
        <li className={`${mobile ? 'text-3xl w-full' : 'w-16'} py-2 font-[500] hover:font-[600] text-left cursor-pointer`}>
          <button>로그인</button>
        </li>
        <li className={`${mobile ? 'text-3xl w-full' : 'w-16'} py-2 font-[500] hover:font-[600] text-left cursor-pointer`}>
          <button>로그아웃</button>
        </li>
      </ul>
    </div>
  )
}

export default NavItem