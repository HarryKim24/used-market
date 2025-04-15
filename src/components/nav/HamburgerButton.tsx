import { useState } from "react";

const HamburgerButton = () => {
  const [open, setOpen] = useState(false)
  const toggleMenu = () => setOpen(!open)

  return (
    <button
      onClick={toggleMenu}
      className="w-8 h-8 flex flex-col items-center justify-center sm:hidden relative"
    >
      <span
        className={`block h-0.5 w-6 bg-black rounded absolute transition-transform duration-400 ease-in-out
        ${open ? 'rotate-45' : '-translate-y-1.5'}`}
      />
      <span
        className={`block h-0.5 w-6 bg-black rounded absolute transition-transform duration-400 ease-in-out
        ${open ? '-rotate-45' : 'translate-y-1.5'}`}
      />
    </button>
  )
}

export default HamburgerButton;