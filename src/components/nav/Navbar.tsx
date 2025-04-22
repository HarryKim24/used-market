'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import NavItem from './NavItem'
import { AnimatePresence, motion } from 'framer-motion'
import HamburgerButton from './HamburgerButton'
import { User } from '@/types/user'

interface NavbarProps {
  currentUser?: User | null;
}

const Navbar = ({ currentUser }: NavbarProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    console.log('currentUser', currentUser);
  }, [currentUser]);
  

  const handleHamburgerClick = () => {
    setMenuOpen(prev => !prev)
  }

  useEffect(() => {
    if (menuOpen) {
      setShowMenu(true)
      document.body.style.overflow = 'hidden'
    }
  }, [menuOpen])

  const handleExitComplete = () => {
    setShowMenu(false)
    document.body.style.overflow = ''
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640 && menuOpen) {
        handleHamburgerClick()
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [menuOpen])

  return (
    <nav className="relative z-10 w-full bg-[#ffffffcc]">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mx-5 sm:mx-10 lg:mx-20">
        <div className="flex items-center justify-between w-full text-2xl h-14">
          <div className="w-fit">
            <motion.div
              animate={{ opacity: menuOpen ? 0 : 1 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <Link href="/">Logo</Link>
            </motion.div>
          </div>
          <div
            className="sm:hidden cursor-pointer"
          >
            <HamburgerButton open={menuOpen} onClick={handleHamburgerClick} />
          </div>
        </div>

        <div className="hidden sm:block">
          <NavItem currentUser={currentUser} />
        </div>
      </div>

      <div className="block sm:hidden">
        <AnimatePresence onExitComplete={handleExitComplete}>
          {menuOpen && showMenu && (
            <motion.div
              key="mobile-nav"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <NavItem mobile currentUser={currentUser} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}

export default Navbar
