import { motion, useInView } from 'motion/react'
import { useRef, type ReactNode } from 'react'

import { cx } from '../lib/cx'

/** Plain heading. The lines prop stays so callers don't have to change; the
    lines just render as static block spans — no rise-out-of-mask animation. */
export function Lines({ lines, className, as: Tag = 'h1' }: { lines: ReactNode[]; className?: string; delay?: number; as?: 'h1' | 'h2' | 'p' }) {
  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block">
          {line}
        </span>
      ))}
    </Tag>
  )
}

/** Opacity-only fade when scrolled into view. No sliding, no transforms. */
export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string; y?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -8% 0px' })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.15, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

/** Full artwork, never cropped: the image is letterboxed (object-contain) and
    the leftover frame stays a quiet solid surface behind it. */
export function BoxArt({ src, alt, className, eager = false }: { src: string; alt: string; className?: string; eager?: boolean }) {
  return (
    <div className={cx('relative overflow-hidden bg-surface-2', className)}>
      <img src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} className="relative size-full object-contain" />
    </div>
  )
}
