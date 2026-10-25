import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'

import { site } from '../../data/site'

// Full-screen entry overlay. No buttons or dots: just the profile name and a
// quietly shimmering "click to enter…" line. Click anywhere, or press Enter /
// Space, to come through. Reduced motion is respected by the global rule.
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
          exit={{ opacity: 0, scale: 1.06, filter: 'blur(6px)' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div aria-hidden className="vignette absolute inset-0" />
          <div aria-hidden className="grain absolute inset-0" />

          <motion.div
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.6, ease: 'easeOut' }}
            className="absolute top-1/2 left-1/2 h-[60%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(76_32_128/0.22),transparent)] blur-3xl animate-drift-a"
          />

          <div className="relative flex flex-col items-center gap-7 px-6 text-center">
            <motion.h2
              initial={{ opacity: 0, letterSpacing: '0.35em' }}
              animate={{ opacity: 1, letterSpacing: '0.02em' }}
              transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-glow font-display text-[clamp(40px,9vw,84px)]"
            >
              {site.name}
            </motion.h2>

            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.7, ease: 'easeOut' }}
              className="shimmer text-[12.5px] tracking-[0.34em] uppercase"
            >
              click to enter…
            </motion.span>

            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.3 }}
              className="text-[10.5px] tracking-[0.2em] text-faint uppercase"
            >
              or press enter
            </motion.span>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
