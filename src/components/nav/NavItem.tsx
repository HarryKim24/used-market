'use client'
import Link from 'next/link'
import React from 'react'

const NavItem = ({ mobile }: { mobile?: boolean }) => {
  return (
    <ul 
      className={`
        text-md justify-center flex gap-4 w-full items-center
        ${mobile ? "flex-col" : ""}
      `}
    >
      <li className='w-16 py-2 font-medium hover:font-semibold text-center cursor-pointer'>
        <Link href='profile'>프로필</Link>
      </li>
      <li className='w-16 py-2 font-medium hover:font-semibold text-center cursor-pointer'>
      <button>로그인</button>
      </li>
      <li className='w-16 py-2 font-medium hover:font-semibold text-center cursor-pointer'>
        <button>로그아웃</button>
      </li>
    </ul>
  )
}

export default NavItem
