import React from 'react'
import LocalNav from './LocalNav';

interface ContainerProps {
  children: React.ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return (
    <div className='bg-white sm:px-10 lg:px-20'>
      <LocalNav
        title="상품 업로드"
      />
      <div
        className='mx-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4 py-6'
      >
        {children}
      </div>
    </div>
  )
}

export default Container
