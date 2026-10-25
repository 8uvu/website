import { useState, type FormEvent } from 'react'

import { site } from '../../data/site'
import { useLocalTime } from './time'

export function Footer() {
  const time = useLocalTime()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const [error, setError] = useState('')

  async function submit(e: FormEvent) {
    e.preventDefault()
    setState('sending')
    const response = await fetch('/api/contact', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(form) })
    if (response.ok) setState('done')
    else {
      setState('error')
      setError(((await response.json()) as { error?: string }).error ?? 'Something went wrong.')
    }
  }

  const field =
    'h-12 w-full rounded-control border border-line bg-surface-2 px-4 text-[14px] placeholder:text-faint transition-colors duration-150 focus:border-line-strong focus:outline-none'

  return (
    <footer id="contact" className="relative mx-auto w-full max-w-[520px] px-5 pb-16 pt-4">
      <h2 className="text-[14px] font-medium">Contact</h2>

      {state === 'done' ? (
        <div className="mt-3 rounded-card border border-line bg-surface p-6">
          <p className="font-display text-[20px]">Thank you</p>
          <p className="mt-1 text-[14px] text-muted">I read everything myself and reply within two days.</p>
        </div>
      ) : (
        <form onSubmit={submit} className="mt-3 flex flex-col gap-2.5 rounded-card border border-line bg-surface p-6">
          <div className="grid gap-2.5 sm:grid-cols-2">
            <input required placeholder="Your name" className={field} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input required type="email" placeholder="Email" className={field} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
          <textarea
            required
            placeholder="What's on your mind"
            className={`${field} h-auto min-h-[100px] shrink-none resize-none py-3`}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />
          <button
            type="submit"
            disabled={state === 'sending'}
            className="mt-1 h-11 rounded-control border border-line-strong text-[14px] font-medium transition-colors duration-150 hover:border-accent hover:text-accent disabled:opacity-50"
          >
            Send
          </button>
          {state === 'error' && <p className="text-[12.5px] text-accent">{error}</p>}
        </form>
      )}

      <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 text-[12.5px] text-faint">
        <ul className="flex flex-wrap gap-x-4 gap-y-1">
          {site.socials.map((s) =>
            'href' in s && s.href ? (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer noopener" className="transition-colors duration-150 hover:text-fg">
                  {s.label}
                </a>
              </li>
            ) : null,
          )}
        </ul>
        <p>
          {time} · © {new Date().getFullYear()} {site.name}
        </p>
      </div>
    </footer>
  )
}
