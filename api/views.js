// 8uvu.runs-on.dev is served by Vercel, which has no database here. The page
// detects this response and falls back to a per-device view count instead of
// pretending this is a shared counter.
export default function handler(_req, res) {
  res.status(503).json({ error: 'views not stored here' })
}
