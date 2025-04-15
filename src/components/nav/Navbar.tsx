'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import NavItem from './NavItem'
import { AnimatePresence, motion } from 'framer-motion'
import HamburgerButton from './HamburgerButton'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
<nav className="relative z-10 w-full bg-[#ffffffcc]">
  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mx-5 sm:mx-10 lg:mx-20">
    <div className="flex items-center justify-between w-full text-2xl h-14">
      <Link href="/">중고장터</Link>
      <div
        className="sm:hidden cursor-pointer"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <HamburgerButton />
      </div>
    </div>
    <div className="hidden sm:block">
      <NavItem />
    </div>
  </div>
  <div className="block sm:hidden">
    <AnimatePresence>
      {menuOpen && (
        <motion.div
          key="mobile-nav"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="overflow-hidden"
        >
          <NavItem mobile />
        </motion.div>
      )}
    </AnimatePresence>
  </div>
</nav>

  )
}

export default Navbar
