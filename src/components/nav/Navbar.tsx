'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import NavItem from './NavItem'
import { AnimatePresence, motion } from 'framer-motion'
import HamburgerButton from './HamburgerButton'
import { User } from '@/types/user'
import { LuRabbit } from "react-icons/lu";

interface NavbarProps {
  currentUser?: User | null;
}

const Navbar = ({ currentUser }: NavbarProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

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
    <nav className={`
      fixed top-0 left-0 z-50 w-full 
      bg-white/70 backdrop-blur-2xl
    `}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mx-5 lg:mx-10">
        <div className="flex items-center justify-between w-full text-2xl h-14">
          <div className="w-fit">
            <motion.div
              animate={{ opacity: menuOpen ? 0 : 1 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <Link href="/"><LuRabbit size={32} /></Link>
            </motion.div>
          </div>
          <div className="sm:hidden cursor-pointer">
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
              <NavItem mobile currentUser={currentUser} onClickNavItem={() => setMenuOpen(false)} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}

export default Navbar
