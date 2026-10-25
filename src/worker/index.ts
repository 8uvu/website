import { Hono } from 'hono'

type Env = { ASSETS: Fetcher; DB?: D1Database }

const app = new Hono<{ Bindings: Env }>()

app.get('/api/health', (c) => c.json({ ok: true }))

// Contact form. Forward to your inbox with an email API (key in Sites →
// Secrets) or store in D1; for now it validates and acknowledges.
app.post('/api/contact', async (c) => {
  const body = await c.req.json<{ name?: string; email?: string; message?: string }>().catch(() => ({}) as Record<string, string>)
  if (!body.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) return c.json({ error: 'Enter a valid email address.' }, 400)
  if (!body.message?.trim()) return c.json({ error: 'Write a few words about the project.' }, 400)
  return c.json({ ok: true })
})

// Profile views. One row in SQLite, incremented on every call; the table and
// its first row are created on first use, so there is no migration step.
// Without a DB binding (e.g. preview) it reports honestly instead of faking.
app.post('/api/views', async (c) => {
  const db = c.env.DB
  if (!db) return c.json({ error: 'views not stored here' }, 503)
  await db
    .prepare('CREATE TABLE IF NOT EXISTS profile_views (id INTEGER PRIMARY KEY CHECK (id = 1), views INTEGER NOT NULL DEFAULT 0)')
    .run()
  const row = await db
    .prepare(
      `INSERT INTO profile_views (id, views) VALUES (1, 1)
       ON CONFLICT (id) DO UPDATE SET views = views + 1
       RETURNING views`,
    )
    .first<{ views: number }>()
  return c.json({ views: row?.views ?? 1 })
})

app.all('*', (c) => c.env.ASSETS.fetch(c.req.raw))

export default app
