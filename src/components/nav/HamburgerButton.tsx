type Props = {
  open: boolean
  onClick: () => void
}

const HamburgerButton = ({ open, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="w-8 h-8 flex flex-col items-center justify-center sm:hidden relative"
    >
      <span
        className={`block h-0.5 w-6 bg-black rounded absolute transition-transform duration-300 ease-in-out
        ${open ? 'rotate-45' : '-translate-y-1.5'}`}
      />
      <span
        className={`block h-0.5 w-6 bg-black rounded absolute transition-transform duration-300 ease-in-out
        ${open ? '-rotate-45' : 'translate-y-1.5'}`}
      />
    </button>
  )
}

export default HamburgerButton
