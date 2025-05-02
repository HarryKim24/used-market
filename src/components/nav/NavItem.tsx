import { User } from '@/types/user';
import { signIn, signOut } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

interface NavItemProps {
  mobile?: boolean;
  currentUser?: User | null;
}

const NavItem = ({ mobile, currentUser }: NavItemProps) => {

  return (
    <div className={`
      w-full 
      ${mobile ? "flex justify-start items-start h-[calc(100vh-56px)] p-6" : ""}
    `}>
      <ul 
        className={`
          text-md flex gap-6 font-[500] hover:font-[600]
          ${mobile ? "flex-col items-start w-full pl-4" : "items-center justify-center"}
        `}
      >
        <li className={`${mobile ? 'text-3xl w-full' : 'py-2 cursor-pointer'}`}>
          <Link className="inline-flex items-center justify-center whitespace-nowrap" href='/chat'>채팅</Link>
        </li>
        <li className={`${mobile ? 'text-3xl w-full' : 'py-2 cursor-pointer'}`}>
          <Link className="inline-flex items-center justify-center whitespace-nowrap" href='/products/upload'>물건 팔기</Link>
        </li>
        <li className={`${mobile ? 'text-3xl w-full' : 'py-2 cursor-pointer'}`}>
          <Link className="inline-flex items-center justify-center whitespace-nowrap" href='/admin'>관리자</Link>
        </li>
        <li className={`${mobile ? 'text-3xl w-full' : 'py-2 cursor-pointer'}`}>
          <Link className="inline-flex items-center justify-center whitespace-nowrap" href='/profile'>프로필</Link>
        </li>
        {currentUser ? (
          <li className={`${mobile ? 'text-3xl w-full' : 'py-2 cursor-pointer'}`}>
            <button className="inline-flex items-center justify-center whitespace-nowrap" onClick={() => signOut()}>로그아웃</button>
          </li>
        ) : (
          <li className={`${mobile ? 'text-3xl w-full' : 'py-2 cursor-pointer'}`}>
            <button className="inline-flex items-center justify-center whitespace-nowrap" onClick={() => signIn()}>로그인</button>
          </li>
        )}
      </ul>
    </div>
  )
}

export default NavItem