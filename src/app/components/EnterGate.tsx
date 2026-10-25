import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'

import { site } from '../../data/site'

// Full-screen entry overlay. Plain text, no decoration: click anywhere or
// press Enter / Space to open the site. The exit is a simple 200ms fade.
export function EnterGate({ onEnter }: { onEnter: () => void }) {
  const [open, setOpen] = useState(true)

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        dismiss()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  function dismiss() {
    setOpen(false)
    onEnter()
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.button
          key="enter-gate"
          type="button"
          onClick={dismiss}
          aria-label="Enter the site"
          className="fixed inset-0 z-[100] grid cursor-pointer place-items-center bg-bg"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex flex-col items-center gap-2 px-6 text-center">
            <p className="text-[15px] font-medium">{site.name}</p>
            <p className="text-[14px] text-muted">Click to enter…</p>
            <p className="text-[12px] text-faint">or press Enter</p>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
