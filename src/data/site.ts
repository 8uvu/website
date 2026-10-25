// ─────────────────────────────────────────────────────────────────────────────
//  PROFILE — edit everything visible on the page here
// ─────────────────────────────────────────────────────────────────────────────
//  • name / tagline / status / bio  — the card's text
//  • background               — set `image` (or `video`) to any /images/… URL;
//    leaving both empty keeps the plain near-black backdrop
//  • audio                    — put a URL (e.g. /audio/theme.mp3) to enable a
//    subtle track after the visitor enters; empty = no audio
//  • badges                   — the small chips under the tagline
//  • socials                  — add/remove freely; an entry without `href`
//    (like Discord here) copy-on-clicks instead
//  • accent color             — one place, src/styles.css → `--color-accent`
// ─────────────────────────────────────────────────────────────────────────────

export const site = {
  name: 'Cenotaph',
  tagline: 'Games and coding',
  status: { label: 'Online', online: true },
  bio: 'I like games and coding. Most of my free time goes to games, and the rest goes into little things I build with code.',
  avatar: '/images/mark.png',

  background: {
    image: '/images/majoras-mask-1.webp',   // the moon shot @ /images; swap for any image
    video: '',                              // e.g. '/images/backdrop.mp4' (muted loop)
    overlay: 0.78,                          // 0–1 darkness over the background
  },

  audio: {
    url: '',         // e.g. '/audio/ambient.mp3'
    volume: 0.4,     // 0–1
  },

  badges: ['Games', 'Coding', 'Retro'],

  socials: [
    { label: 'Discord', handle: '8uvu' },   // no href → copies the handle on click
    { label: 'GitHub', href: 'https://github.com/8uvu' },
    { label: 'Instagram', href: 'https://www.instagram.com/8uvu4/' },
    { label: 'TikTok', href: 'https://www.tiktok.com/@8uvu1' },
  ],

  copyLinkText: 'Copy profile link',
}

// The games section under the card. Everything about one game lives here.
export interface Project {
  slug: string
  title: string
  client: string
  category: string
  year: string
  cover: string
  tint: string
  summary: string
  deliverables: string[]
  shots: string[]
  link?: string
  body: string[]
  size: 'large' | 'small'
}

export const projects: Project[] = [
  {
    slug: 'majoras-mask',
    title: 'Majora’s Mask',
    client: 'Nintendo EAD',
    category: 'Action-adventure',
    year: '2000',
    cover: '/images/majoras-mask.jpg',
    tint: '#241a33',
    summary: 'Three days, one doomed town, and a mask for almost everything.',
    deliverables: ['Nintendo 64'],
    shots: [
      '/images/majoras-mask-1.webp',
      '/images/majoras-mask-2.webp',
      '/images/majoras-mask-3.webp',
    ],
    link: 'https://en.wikipedia.org/wiki/The_Legend_of_Zelda:_Majora%27s_Mask',
    body: [
      'I love Majora’s Mask because it gives a weird vibe that I love.',
      'A sequel made in about a year on the Nintendo 64, and you can feel the rush in the best way: a smaller world, a mask for almost every problem, and a moon that keeps getting closer.',
      'Everything runs on a three-day loop over one doomed town. You learn it, you lose it, and you start again with more information — which is a strange thing for a game to be about, and the reason people still talk about it.',
    ],
    size: 'large',
  },
  {
    slug: 'breath-of-the-wild',
    title: 'Breath of the Wild',
    client: 'Nintendo EPD',
    category: 'Action-adventure',
    year: '2017',
    cover: '/images/breath-of-the-wild.jpg',
    tint: '#16233a',
    summary: 'The one that turned Hyrule into a place you cross, not a place you visit.',
    deliverables: ['Nintendo Switch', 'Wii U'],
    shots: [
      '/images/breath-of-the-wild-1.webp',
      '/images/breath-of-the-wild-2.webp',
      '/images/breath-of-the-wild-3.webp',
    ],
    link: 'https://en.wikipedia.org/wiki/The_Legend_of_Zelda:_Breath_of_the_Wild',
    body: [
      'Zelda, but the whole map is a promise. Climb anything, cook anything, and go stand on the thing you saw on the horizon ten minutes ago.',
      'Released in 2017 alongside the Switch, it quietly rewrote what an open-world game is allowed to do: no checklist telling you where to go, just a map, a stick and whatever weather turns up.',
    ],
    size: 'small',
  },
  {
    slug: 'binding-of-isaac',
    title: 'The Binding of Isaac',
    client: 'Edmund McMillen',
    category: 'Roguelike',
    year: '2011',
    cover: '/images/isaac.jpg',
    tint: '#2a140f',
    summary: 'Apollyon <3',
    deliverables: ['Steam', 'Nintendo Switch', 'PlayStation', 'Xbox'],
    shots: [
      '/images/isaac-1.jpg',
      '/images/isaac-2.jpg',
      '/images/isaac-3.jpg',
    ],
    link: 'https://en.wikipedia.org/wiki/The_Binding_of_Isaac_(video_game)',
    body: [
      'A run can be over in twenty minutes or go on for an hour, and either way you come out with a story about a build that had no business working.',
      'The original was a Flash game jam project from 2011; Rebirth rebuilt it properly in 2014, and the runs have not stopped since.',
    ],
    size: 'small',
  },
  {
    slug: 'minecraft',
    title: 'Minecraft',
    client: 'Mojang Studios',
    category: 'Sandbox',
    year: '2011',
    cover: '/images/minecraft.jpg',
    tint: '#152312',
    summary: 'Infinite blocks, no rules about what to do first — the sandbox everything else gets compared to.',
    deliverables: ['Java Edition', 'Bedrock Edition'],
    shots: [
      '/images/minecraft-1.png',
      '/images/minecraft-2.png',
      '/images/minecraft-3.jpg',
    ],
    link: 'https://en.wikipedia.org/wiki/Minecraft',
    body: [
      'The game I will still be playing in twenty years, probably. Dig a hole, build a bridge over a ravine, wire a door with redstone — nothing in it stops you, and not much pushes you either.',
      'It started as a one-person project by Markus Persson in 2009 and became the best-selling video game ever made. Most of my worlds never get finished, and I have made peace with that.',
    ],
    size: 'large',
  },
]

export const bySlug = (slug: string) => projects.find((p) => p.slug === slug)

export const experience = [
  { period: 'Now', title: 'Little things with code', detail: 'Small projects, finished and shared' },
  { period: 'Most days', title: 'Games', detail: 'Retro especially, and whatever I am replaying' },
  { period: 'Always', title: 'Learning and tinkering', detail: 'Something new is open in a tab somewhere' },
]
