import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'

// Full-screen entry overlay: "click to enter…". Enter or Space also enters.
// Reduced motion is respected by the global rule — no pulse animation, and the
// exit fade drops to near-instant.
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
          className="fixed inset-0 z-[100] grid cursor-pointer place-items-center bg-bg text-fg"
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div aria-hidden className="vignette absolute inset-0" />
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
            className="relative flex flex-col items-center gap-5"
          >
            <span className="grid size-16 place-items-center rounded-full border border-line-strong">
              <span className="size-2 rounded-full bg-accent breathe" />
            </span>
            <span className="text-[14px] tracking-[0.28em] text-muted uppercase">Click to enter…</span>
          </motion.span>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
