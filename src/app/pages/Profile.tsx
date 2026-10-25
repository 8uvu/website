import { motion } from 'motion/react'
import { ArrowRight, Eye, Link2, Volume2, VolumeX } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'

import { experience, projects, site } from '../../data/site'
import { brandIcons } from '../components/BrandIcons'
import { Reveal } from '../components/motion'

const ease = [0.22, 1, 0.36, 1] as const
const icons = brandIcons

export function Profile() {
  return (
    <div className="relative min-h-svh overflow-hidden">
      <Backdrop />

      <div className="relative mx-auto w-full max-w-[520px] px-5 pb-20 pt-20 sm:pt-24">
        {/* The card */}
        <motion.section
          initial={{ opacity: 0, y: 26, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 70, damping: 19, mass: 0.9, delay: 0.1 }}
          className="rounded-card border border-line bg-surface/85 pb-8 pt-14 shadow-[0_24px_80px_rgb(0_0_0/0.6)] backdrop-blur-md"
        >
          <div className="flex flex-col items-center px-6 text-center">
            {/* 1 — avatar */}
            <span className="relative inline-grid size-24 place-items-center">
              {site.status.online && (
                <span aria-hidden className="absolute -right-0.5 -bottom-0.5 z-10 grid size-4 place-items-center rounded-full border-2 border-surface bg-emerald-400" >
                  <span className="sr-only">online</span>
                </span>
              )}
              <img
                src={site.avatar}
                alt={`${site.name} avatar`}
                className="size-24 rounded-full border border-line-strong object-cover shadow-[0_0_0_1px_rgb(237_237_240/0.08),0_0_36px_rgb(195_60_85/0.22)]"
              />
            </span>

            {/* 2 — name + status */}
            <h1 className="text-glow font-display mt-6 text-[52px] leading-none sm:text-[60px]">{site.name}</h1>
            <p className="mt-3 text-[13px] text-faint">
              {site.status.online ? (
                <>
                  <span aria-hidden className="mr-2 inline-block size-1.5 rounded-full bg-emerald-400 align-[1px]" />
                  {site.status.label}
                </>
              ) : (
                site.status.label
              )}
            </p>

            {/* 3 — tagline + badges (optional; render nothing when empty) */}
            {site.tagline && <p className="mt-3 text-[14.5px] text-muted">{site.tagline}</p>}
            {site.badges.length > 0 && (
              <ul className="mt-4 flex flex-wrap justify-center gap-2" aria-label="Badges">
                {site.badges.map((b) => (
                  <li key={b} className="rounded-full border border-line bg-surface-2/70 px-3 py-1 text-[11.5px] text-faint">
                    {b}
                  </li>
                ))}
              </ul>
            )}

            {/* 4 — bio */}
            <Typewriter text={site.bio} className="mt-6 max-w-sm text-pretty text-[14px] leading-relaxed text-muted" />
          </div>

          {/* 5 — social links, tidy grid */}
          <ul className="mx-6 mt-8 grid grid-cols-2 gap-2.5">
            {site.socials.map((s, i) => {
              const Icon = icons[s.label] ?? ArrowRight
              return (
                <motion.li
                  key={s.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.35 + i * 0.07, ease }}
                >
                  {'href' in s && s.href ? (
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="group flex items-center gap-3 rounded-control border border-line bg-surface-2/60 px-4 py-3 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-line-strong hover:bg-surface-2 hover:shadow-[0_0_24px_rgb(195_60_85/0.12)]"
                    >
                      <Icon className="size-[15px] shrink-0 text-muted transition-colors duration-300 group-hover:text-fg" />
                      <span className="text-[13.5px] text-muted transition-colors duration-300 group-hover:text-fg">{s.label}</span>
                    </a>
                  ) : (
                    <CopyHandle handle={'handle' in s && s.handle ? s.handle : s.label} />
                  )}
                </motion.li>
              )
            })}
          </ul>

          {/* 6 — footer: views + copy profile link */}
          <div className="mx-6 mt-8 flex items-center justify-between gap-3 border-t border-line pt-5 text-[12.5px] text-faint">
            <Views />
            <CopyProfileLink />
          </div>

          <AudioToggle />
        </motion.section>

        {/* Games — same column, quieter rows */}
        <Reveal delay={0.1} className="mt-10">
          <p className="label-caps">Games</p>
          <ul className="mt-3 flex flex-col gap-2.5">
            {projects.map((p, i) => (
              <motion.li
                key={p.slug}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -40px 0px' }}
                transition={{ duration: 0.7, delay: i * 0.06, ease }}
              >
                <Link
                  to={`/work/${p.slug}`}
                  className="group flex items-center gap-4 rounded-control border border-line bg-surface/80 px-4 py-2.5 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-line-strong hover:bg-surface"
                >
                  <span className="image-frame size-11 shrink-0 overflow-hidden rounded-[10px]">
                    <img src={p.cover} alt="" loading="lazy" className="size-full object-cover" />
                  </span>
                  <span className="flex-1 text-left">
                    <span className="block text-[14px] font-medium">{p.title}</span>
                    <span className="block text-[12px] text-faint">{p.category}</span>
                  </span>
                  <span className="text-[12.5px] tabular-nums text-faint">{p.year}</span>
                  <ArrowRight className="size-3.5 shrink-0 text-faint transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-fg" />
                </Link>
              </motion.li>
            ))}
          </ul>
        </Reveal>

        {/* About */}
        <Reveal delay={0.15} className="mt-10">
          <p className="label-caps">About</p>
          <div className="mt-3 rounded-card border border-line bg-surface/80 p-6">
            <ol className="divide-y divide-line">
              {experience.map((e) => (
                <li key={e.title} className="grid gap-0.5 py-4 sm:grid-cols-[110px_1fr]">
                  <span className="text-[12px] tabular-nums text-faint">{e.period}</span>
                  <span>
                    <span className="block text-[14px] font-medium">{e.title}</span>
                    <span className="block text-[13px] text-muted">{e.detail}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </div>
  )
}

/* ── Pieces ─────────────────────────────────────────────────────────────── */

// Vignette + optional custom image/video background (both configurable in
// src/data/site.ts); the dark overlay keeps text readable either way. With no
// image set, a layered aurora — deep violet base, three drifting glows and a
// low fog band — fills the screen.
function Backdrop() {
  const hasBg = Boolean(site.background.image || site.background.video)
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0">
      {hasBg ? (
        <>
          {site.background.video ? (
            <video src={site.background.video} autoPlay muted loop playsInline className="size-full object-cover" />
          ) : (
            <img src={site.background.image} alt="" className="size-full object-cover" />
          )}
          <div className="absolute inset-0 bg-black" style={{ opacity: site.background.overlay }} />
        </>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2, ease }} className="absolute inset-0">
          {/* deep violet base glow behind the card */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_50%_28%,rgb(76_32_128/0.35),transparent_70%)]" />
          {/* crimson wisp, upper left */}
          <div className="animate-drift-b absolute top-[18%] left-[4%] h-[48%] w-[46%] rounded-full bg-[radial-gradient(closest-side,rgb(195_60_85/0.17),transparent)] blur-3xl" />
          {/* ember glow, lower right */}
          <div className="animate-drift-c absolute top-[52%] right-[6%] h-[52%] w-[44%] rounded-full bg-[radial-gradient(closest-side,rgb(214_125_74/0.10),transparent)] blur-3xl" />
          {/* cool counterweight, upper right */}
          <div className="animate-drift-a absolute top-[8%] right-[10%] h-[44%] w-[40%] rounded-full bg-[radial-gradient(closest-side,rgb(62_78_148/0.16),transparent)] blur-3xl" />
          {/* low fog band that slowly breathes */}
          <div className="animate-drift-b absolute bottom-[-14%] left-0 h-[38%] w-full rounded-full bg-[radial-gradient(ellipse_closest-side,rgb(46_36_58/0.5),transparent)] blur-2xl" />
        </motion.div>
      )}
      <div className="vignette absolute inset-0" />
      <div className="grain absolute inset-0" />
    </div>
  )
}

// One character at a time. With reduced motion the whole bio shows at once.
function Typewriter({ text, className }: { text: string; className?: string }) {
  const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const [n, setN] = useState(reduce ? text.length : 0)
  useEffect(() => {
    if (n >= text.length) return
    const id = window.setTimeout(() => setN(n + 1), 24)
    return () => window.clearTimeout(id)
  }, [n, text])
  return (
    <p className={className}>
      {text.slice(0, n)}
      {n < text.length && <span className="caret-blink text-accent" aria-hidden>|</span>}
    </p>
  )
}

// Tries the server first (a real, shared count on the Workers host); when no
// database is reachable it counts per-device locally and says so.
function Views() {
  const [views, setViews] = useState<number | null>(null)
  const [isLocal, setIsLocal] = useState(false)

  useEffect(() => {
    let alive = true
    ;(async () => {
      try {
        const response = await fetch('/api/views', { method: 'POST' })
        if (!response.ok) throw new Error('no view counter here')
        const data = (await response.json()) as { views?: number }
        if (typeof data.views !== 'number') throw new Error('bad payload')
        if (alive) setViews(data.views)
      } catch {
        // Per-device fallback: never presented as a shared counter.
        try {
          const n = (Number(localStorage.getItem('profile-views')) || 0) + 1
          localStorage.setItem('profile-views', String(n))
          if (alive) {
            setViews(n)
            setIsLocal(true)
          }
        } catch {
          if (alive) setViews(null)
        }
      }
    })()
    return () => {
      alive = false
    }
  }, [])

  if (views === null) return null
  return (
    <span title={isLocal ? 'Counted on this device' : 'Total views'}>
      <Eye className="mr-1.5 inline size-3.5" />
      <span className="tabular-nums">{views.toLocaleString('en-US')}</span>
      {' '}views
    </span>
  )
}

function CopyProfileLink() {
  const [copied, setCopied] = useState(false)
  return (
    <button
      type="button"
      onClick={async () => {
        const url = window.location.origin + '/'
        try {
          await navigator.clipboard.writeText(url)
        } catch {
          // Clipboard API unavailable: fall back to a hidden textarea copy.
          const ta = document.createElement('textarea')
          ta.value = url
          document.body.appendChild(ta)
          ta.select()
          try {
            document.execCommand('copy')
          } catch {
            window.prompt('Copy the link:', url)
          }
          ta.remove()
        }
        setCopied(true)
        window.setTimeout(() => setCopied(false), 2000)
      }}
      className="group inline-flex items-center gap-1.5 transition-colors hover:text-fg"
      aria-label={site.copyLinkText}
    >
      {copied ? <Link2 className="size-3.5 text-accent" /> : <Link2 className="size-3.5" />}
      {copied ? 'Copied' : site.copyLinkText}
    </button>
  )
}

function CopyHandle({ handle }: { handle: string }) {
  const [copied, setCopied] = useState(false)
  const Icon = brandIcons.Discord ?? ArrowRight
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(handle)
        } catch {
          window.prompt('Copy the handle:', handle)
        }
        setCopied(true)
        window.setTimeout(() => setCopied(false), 2000)
      }}
      className="group flex items-center gap-3 rounded-control border border-line bg-surface-2/60 px-4 py-3 text-left transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-line-strong hover:bg-surface-2 hover:shadow-[0_0_24px_rgb(195_60_85/0.12)]"
      aria-label={`Copy ${handle} on Discord`}
    >
      <Icon className={copied ? 'size-[15px] shrink-0 text-accent' : 'size-[15px] shrink-0 text-muted transition-colors group-hover:text-fg'} />
      <span className="flex-1 text-[13.5px] text-muted transition-colors group-hover:text-fg">{copied ? 'Copied' : 'Discord'}</span>
    </button>
  )
}

// Ambient audio, off by default (site.audio.url in src/data/site.ts). It
// never starts before the visitor has entered; the toggle stays obvious.
function AudioToggle() {
  const url = site.audio.url
  const ref = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.volume = site.audio.volume
    const start = () => {
      el.play().then(() => setPlaying(true)).catch(() => setPlaying(false))
    }
    window.addEventListener('app:entered', start, { once: true })
    return () => window.removeEventListener('app:entered', start)
  }, [url])

  if (!url) return null
  return (
    <div className="mt-6 flex justify-center">
      <button
        type="button"
        onClick={() => {
          const el = ref.current
          if (!el) return
          if (el.paused) el.play().then(() => setPlaying(true)).catch(() => {})
          else {
            el.pause()
            setPlaying(false)
          }
        }}
        aria-label={playing ? 'Mute background audio' : 'Play background audio'}
        className="grid size-9 place-items-center rounded-full border border-line text-muted transition-colors hover:border-line-strong hover:text-fg"
      >
        {playing ? <Volume2 className="size-4" /> : <VolumeX className="size-4" />}
      </button>
      <audio ref={ref} src={url} loop preload="none" />
    </div>
  )
}
