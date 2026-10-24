// Vercel serverless function: receives the contact form, validates it the same
// way the Freebuff worker does, and acknowledges.
function isOpenEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'POST only' })
    return
  }
  let body = {}
  try {
    body = typeof req.body === 'object' && req.body !== null ? req.body : JSON.parse(req.body || '{}')
  } catch {
    body = {}
  }
  if (!body.email || !isOpenEmail(body.email)) {
    res.status(400).json({ error: 'Enter a valid email address.' })
    return
  }
  if (!body.message || !String(body.message).trim()) {
    res.status(400).json({ error: 'Write a few words about the project.' })
    return
  }
  res.status(200).json({ ok: true })
}
