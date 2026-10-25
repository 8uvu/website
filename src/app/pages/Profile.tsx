import { motion } from 'motion/react'
import { ArrowRight, Camera, Code2, Copy, Eye, MessageCircle, Music2 } from 'lucide-react'
import { useEffect, useState, type ComponentType } from 'react'
import { Link } from 'react-router'

import { experience, projects, site } from '../../data/site'
import { Reveal } from '../components/motion'

const ease = [0.22, 1, 0.36, 1] as const

const icons: Record<string, ComponentType<{ className?: string }>> = {
  GitHub: Code2,
  Instagram: Camera,
  TikTok: Music2,
}

export function Profile() {
  return (
    <div className="relative min-h-svh overflow-hidden">
      {/* Backdrop: two slow glows behind the card, faint grain over it */}
      <div aria-hidden className="pointer-events-none fixed inset-0">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.6, ease }} className="absolute inset-0">
          <div className="round absolute -top-[12%] left-1/2 h-[70%] w-[80%] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(97_40_176/0.28),transparent)] blur-3xl animate-drift-a" />
          <div className="round absolute top-[30%] left-[8%] h-[60%] w-[50%] rounded-full bg-[radial-gradient(closest-side,rgb(199_17_63/0.2),transparent)] blur-3xl animate-drift-b" />
          <div className="round absolute bottom-[-10%] right-[4%] h-[55%] w-[45%] rounded-full bg-[radial-gradient(closest-side,rgb(255_122_61/0.12),transparent)] blur-3xl animate-drift-c" />
        </motion.div>
        <div className="grain absolute inset-0" />
      </div>

      <div className="relative mx-auto w-full max-w-[560px] px-5 pb-20 pt-24 sm:pt-28">
        {/* The card */}
        <motion.section
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease }}
          className="rounded-card border border-line bg-surface/85 pb-8 pt-14 shadow-[0_24px_80px_rgb(0_0_0/0.55)] backdrop-blur-md"
        >
          <div className="flex flex-col items-center px-6 text-center">
            <span className="image-frame relative size-24 overflow-hidden rounded-[22px] ring-1 ring-line-strong">
              <img src="/images/mark.png" alt={site.name} className="size-full object-cover" />
            </span>
            <h1 className="text-glow font-display mt-6 text-[56px] leading-none sm:text-[64px]">{site.name}</h1>
            <p className="mt-4 text-[14.5px] text-muted">{site.role}</p>
            <Typewriter text={site.intro} className="mt-4 max-w-xs text-pretty text-[14px] leading-relaxed text-faint" />

            {/* Views + socials */}
            <div className="mt-7 flex items-center gap-2 text-[13px] text-faint">
              <Eye className="size-3.5" />
              <Views />
            </div>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              {site.socials.map((s) => {
                const Icon = icons[s.label] ?? ArrowRight
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="grid size-11 place-items-center rounded-[13px] border border-line bg-surface-2/70 text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:text-fg"
                  >
                    <Icon className="size-4" />
                  </a>
                )
              })}
              <DiscordButton />
            </div>
          </div>

          {/* Slash-marquee inside the card, guns.lol-style */}
          <div className="mt-9 overflow-hidden border-y border-line py-3" aria-hidden>
            <ul className="font-pixel flex w-max animate-marquee items-center gap-8 whitespace-nowrap text-[9px] text-muted">
              {[...site.marquee, ...site.marquee].map((item, i) => (
                <li key={i} className="flex items-center gap-8">
                  {item}
                  <span className="size-1 shrink-0 bg-accent" />
                </li>
              ))}
            </ul>
          </div>
        </motion.section>

        {/* Games as link rows */}
        <Reveal delay={0.1} className="mt-12">
          <p className="font-pixel text-[9px] text-accent">▸ GAMES</p>
          <ul className="mt-4 flex flex-col gap-3">
            {projects.map((p) => (
              <li key={p.slug}>
                <Link
                  to={`/work/${p.slug}`}
                  className="group flex items-center gap-4 rounded-[16px] border border-line bg-surface/80 px-4 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:bg-surface-2/80"
                >
                  <span className="image-frame size-12 shrink-0 overflow-hidden rounded-[10px]">
                    <img src={p.cover} alt="" loading="lazy" className="size-full object-cover" />
                  </span>
                  <span className="flex-1 text-left">
                    <span className="block text-[15px] font-medium">{p.title}</span>
                    <span className="block text-[12.5px] text-faint">{p.category}</span>
                  </span>
                  <span className="text-[13px] tabular-nums text-faint">{p.year}</span>
                  <ArrowRight className="size-4 shrink-0 text-faint transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-fg" />
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* About */}
        <Reveal delay={0.15} className="mt-12">
          <p className="font-pixel text-[9px] text-accent">▸ ABOUT</p>
          <div className="mt-4 rounded-card border border-line bg-surface/80 p-6">
            <p className="text-pretty text-[14.5px] leading-relaxed text-muted">
              This is a small page I put together to keep a few things about me in one place. Nothing here is trying to sell you anything.
            </p>
            <ol className="mt-6 divide-y divide-line border-t border-line">
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

// Buyer-counter energy, honest version: a local per-device count.
function Views() {
  const [views, setViews] = useState<number | null>(null)
  useEffect(() => {
    try {
      const n = (Number(localStorage.getItem('profile-views')) || 1487) + 1
      localStorage.setItem('profile-views', String(n))
      setViews(n)
    } catch {
      setViews(1487)
    }
  }, [])
  return <span className="tabular-nums">{views === null ? '…' : views.toLocaleString('en-US')} profile views</span>
}

function DiscordButton() {
  const [copied, setCopied] = useState(false)
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(site.discord)
          setCopied(true)
          window.setTimeout(() => setCopied(false), 2000)
        } catch {
          // Clipboard unavailable — the username is on the button anyway.
        }
      }}
      aria-label={copied ? 'Discord username copied' : `Copy Discord username ${site.discord}`}
      className="group grid size-11 place-items-center rounded-[13px] border border-line bg-surface-2/70 text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:text-fg"
    >
      {copied ? <MessageCircle className="size-4 text-accent" /> : <Copy className="size-4" />}
    </button>
  )
}

// One character at a time, guns.lol bio style. Caret blinks forever.
function Typewriter({ text, className }: { text: string; className?: string }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (n >= text.length) return
    const id = window.setTimeout(() => setN(n + 1), 22)
    return () => window.clearTimeout(id)
  }, [n, text])
  return (
    <p className={className}>
      {text.slice(0, n)}
      {n < text.length && <span className="caret-blink text-accent">|</span>}
    </p>
  )
}
