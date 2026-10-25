import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router'

import { bySlug, projects } from '../../data/site'
import { BoxArt, Lines, Reveal } from '../components/motion'

export function Work() {
  const { slug } = useParams()
  const project = slug ? bySlug(slug) : undefined
  if (!project) return <Navigate to="/" replace />
  const index = projects.findIndex((p) => p.slug === project.slug)
  const next = projects[(index + 1) % projects.length]

  return (
    <article        className="mx-auto max-w-[1000px] px-5 pb-24 pt-24 sm:pt-28">
      <Link to="/#work" className="inline-flex h-9 items-center gap-1.5 text-[14px] text-muted transition-colors hover:text-fg">
        <ArrowLeft className="size-4" />
        All games
      </Link>

      <div className="mt-8 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <Lines as="h1" className="font-display text-[clamp(30px,5vw,44px)]" lines={[project.title]} />
        <Reveal delay={0.2} className="max-w-md text-pretty text-[17px] leading-relaxed text-muted lg:pb-4">
          {project.summary}
        </Reveal>
      </div>

      <div className="mt-10 overflow-hidden rounded-card" style={{ background: project.tint }}>
        <BoxArt src={project.cover} alt={project.title} className="aspect-[16/10] sm:aspect-[16/9]" eager />
      </div>

      <div className="mt-16 grid gap-12 lg:grid-cols-[320px_1fr] lg:gap-24">
        <Reveal>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-8 text-[14px] lg:grid-cols-1">
            {[
              ['By', project.client],
              ['Year', project.year],
              ['Genre', project.category],
              ['Available on', project.deliverables.join(', ')],
            ].map(([label, value]) => (
              <div key={label} className="border-t border-line pt-3">
                <dt className="text-muted">{label}</dt>
                <dd className="mt-1 text-fg">{value}</dd>
              </div>
            ))}
            {project.link && (
              <div className="border-t border-line pt-3">
                <a href={project.link} className="link-draw inline-flex items-center gap-1 font-medium">
                  More about it
                  <ArrowUpRight className="size-4" />
                </a>
              </div>
            )}
          </dl>
        </Reveal>
        <div className="max-w-2xl">
          {project.body.map((paragraph, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <p className={`text-pretty leading-relaxed text-fg/90 ${i === 0 ? 'font-display text-[22px] leading-[1.25] sm:text-[26px]' : 'mt-6 text-[15px] text-muted'}`}>{paragraph}</p>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="mt-16">
        <div className="image-frame aspect-[16/9] overflow-hidden rounded-card" style={{ background: project.tint }}>
          <BoxArt src={project.shots[0]} alt="" className="size-full" eager />
        </div>
        {project.shots.length > 1 && (
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {project.shots.slice(1).map((shot, i) => (
              <Reveal key={shot} delay={i * 0.1}>
                <div className="image-frame aspect-[4/3] overflow-hidden rounded-card" style={{ background: project.tint }}>
                  <BoxArt src={shot} alt="" className="size-full" />
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>

      <Link to={`/work/${next.slug}`} className="group mt-32 block border-t border-line pt-10">
        <p className="text-[14px] text-muted">Next game</p>
        <div className="mt-3 flex items-end justify-between gap-6">
          <h2 className="font-display text-[clamp(24px,4vw,36px)] transition-colors duration-150 group-hover:text-accent">{next.title}</h2>
          <span className="image-frame hidden aspect-[4/3] w-[260px] shrink-0 overflow-hidden rounded-card sm:block" style={{ background: next.tint }}>
            <BoxArt src={next.cover} alt="" className="size-full" />
          </span>
        </div>
      </Link>
    </article>
  )
}
