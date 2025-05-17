import React from 'react'

const Footer = () => {
  return (
    <div className='text-center pt-6 pb-6 text-neutral-400 text-sm'>
      <hr className="border-[#d2d2d7] mb-4" />
      <div className="mt-2">
        © 2025 Harry Kim. All rights reserved.
      </div>
      <div className='mt-2 text-xs'>
        Project Repository |{" "}
        <a
          href='https://github.com/HarryKim24/used-market'
          target='_blank'
          rel='noopener noreferrer'
          className='text-[#0066cc] underline'
        >
          https://github.com/HarryKim24/used-market
        </a>
      </div>
      <div className="mt-1 text-xs">
        Contact | <a href="mailto:harrykim@example.com" className="underline text-[#0066cc]">tl9434@naver.com</a>
      </div>
    </div>
  )
}

export default Footer
