import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap, useGSAP } from '@/lib/gsap'
import { type Post, formatDate } from '@/content/blog'

type Props = { post: Post }

export default function BlogFeatured({ post }: Props) {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.from('.bf-img', {
        scale: 1.08,
        duration: 1.6,
        ease: 'power4.out',
      })
      gsap.from('.bf-overlay', {
        opacity: 0,
        duration: 1.2,
        ease: 'power2.out',
      })
      gsap.from('.bf-tag', {
        y: 16,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        delay: 0.5,
      })
      gsap.from('.bf-title', {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        delay: 0.65,
      })
      gsap.from('.bf-meta', {
        y: 20,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        delay: 0.85,
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} className="relative w-full overflow-hidden bg-paper" style={{ height: 'min(92vh, 740px)' }}>
      {/* Full-bleed cover image */}
      <div className="absolute inset-0">
        <img
          src={post.cover}
          alt={post.title}
          className="bf-img h-full w-full object-cover"
          loading="eager"
        />
        {/* Dark gradient overlay — bottom-heavy so title is readable */}
        <div
          className="bf-overlay absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(5,8,6,0.97) 0%, rgba(5,8,6,0.75) 40%, rgba(5,8,6,0.25) 70%, rgba(5,8,6,0.1) 100%)',
          }}
        />
      </div>

      {/* Text content — sits at the bottom */}
      <div className="absolute inset-x-0 bottom-0 px-5 pb-10 md:px-10 lg:px-16 xl:px-24">
        {/* Label row */}
        <div className="bf-tag mb-5 flex flex-wrap items-center gap-3">
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/50">
            Featured
          </span>
          <span className="h-3 w-px bg-white/20" />
          <span className="rounded-full border border-brand/50 bg-brand/15 px-3 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-brand">
            {post.category}
          </span>
          <span className="h-3 w-px bg-white/20" />
          <span className="text-[0.65rem] tabular-nums text-white/40">
            {formatDate(post.date)} &nbsp;·&nbsp; {post.readTime} min read
          </span>
        </div>

        {/* Title */}
        <h2 className="bf-title max-w-4xl font-display text-[clamp(2rem,5.5vw,5rem)] font-semibold leading-[0.97] tracking-[-0.045em] text-white">
          {post.title}
        </h2>

        {/* Excerpt + CTA */}
        <div className="bf-meta mt-6 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-2xl text-[1.05rem] leading-relaxed text-white/65">
            {post.excerpt}
          </p>
          <Link
            to={`/blog/${post.slug}`}
            className="cursor-target group inline-flex shrink-0 items-center gap-2.5 rounded-full border border-brand/60 bg-brand/10 px-6 py-3 text-sm font-semibold text-brand backdrop-blur-sm transition-all duration-300 hover:bg-brand hover:text-forest"
          >
            Read article
            <span className="transition-transform duration-300 group-hover:translate-x-0.5">&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
