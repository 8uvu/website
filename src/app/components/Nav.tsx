import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'

import { site } from '../../data/site'
import { cx } from '../lib/cx'

export function useLocalTime() {
  const [time, setTime] = useState('')
  useEffect(() => {
    const tick = () => setTime(new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit' }).format(new Date()))
    tick()
    const id = window.setInterval(tick, 15_000)
    return () => window.clearInterval(id)
  }, [])
  return time
}

export function Nav() {
  const time = useLocalTime()
  const location = useLocation()
  const [hidden, setHidden] = useState(false)
  const [theme, setThemeState] = useState<'day' | 'night'>(() => (document.documentElement.dataset.theme === 'night' ? 'night' : 'day'))

  const toggleTheme = () => {
    const next = theme === 'night' ? 'day' : 'night'
    setThemeState(next)
    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem('theme', next)
    } catch {
      // Private mode: the theme still applies for this visit.
    }
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', next === 'night' ? '#131211' : '#f2efe9')
  }

  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setHidden(y > last && y > 120)
      last = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const link = (to: string, label: string) => (
    <NavLink
      key={to}
      to={to}
      className={({ isActive }) => cx('link-draw text-[14px] transition-colors', isActive || (to !== '/' && location.pathname.startsWith(to)) ? 'text-fg' : 'text-muted hover:text-fg')}
    >
      {label}
    </NavLink>
  )

  return (
    <header className={cx('fixed inset-x-0 top-0 z-40 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]', hidden && '-translate-y-full')}>
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 sm:px-8">
        <Link to="/" className="text-[15px] font-medium">
          {site.name}
        </Link>
        <nav className="flex items-center gap-6">
          {link('/#work', 'Games')}
          {link('/about', 'About')}
          <Link to="/#contact" className="link-draw text-[14px] text-muted transition-colors hover:text-fg">
            Contact
          </Link>
          <span className="hidden text-[13px] tabular-nums text-faint sm:inline">
            {site.location} {time}
          </span>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'night' ? 'Switch to light theme' : 'Switch to dark theme'}
            className="grid size-7 place-items-center rounded-[9px] border border-line text-muted transition-colors hover:border-line-strong hover:text-fg"
          >
            {theme === 'night' ? <Moon className="size-3.5" /> : <Sun className="size-3.5" />}
          </button>
        </nav>
      </div>
    </header>
  )
}
