import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from '@/lib/gsap'
import { type Post, formatDate } from '@/content/blog'

type Props = { posts: Post[] }

export default function PostGrid({ posts }: Props) {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll<HTMLElement>('.pg-card')
    if (!cards?.length) return
    gsap.fromTo(
      cards,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.65,
        stagger: 0.09,
        ease: 'power3.out',
        scrollTrigger: { trigger: gridRef.current, start: 'top 85%', once: true },
        clearProps: 'all',
      },
    )
  }, [])

  if (!posts.length) return null

  return (
    <div
      ref={gridRef}
      className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3"
    >
      {posts.map((post) => (
        <article key={post.slug} className="pg-card group bg-paper">
          <Link to={`/blog/${post.slug}`} className="cursor-target block h-full">
            {/* Image */}
            <div
              className="relative overflow-hidden"
              style={{ aspectRatio: '16/9', background: post.coverGradient }}
            >
              <img
                src={post.cover}
                alt={post.title}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                loading="lazy"
              />
              {/* Category badge on image */}
              <span className="absolute left-4 top-4 rounded-full bg-paper/80 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.15em] text-brand backdrop-blur-sm">
                {post.category}
              </span>
            </div>

            {/* Text body */}
            <div className="flex flex-col gap-3 p-6 md:p-7">
              <h3 className="font-display text-[1.25rem] font-semibold leading-[1.12] tracking-[-0.025em] text-foreground transition-colors duration-300 group-hover:text-brand md:text-[1.4rem]">
                {post.title}
              </h3>
              <p className="line-clamp-3 text-[0.92rem] leading-relaxed text-muted-foreground">
                {post.excerpt}
              </p>
              <div className="mt-2 flex items-center justify-between border-t border-border pt-4 text-xs tabular-nums text-muted-foreground/60">
                <span>{formatDate(post.date)}</span>
                <span className="flex items-center gap-1 transition-colors group-hover:text-brand">
                  {post.readTime} min read
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5">&rarr;</span>
                </span>
              </div>
            </div>
          </Link>
        </article>
      ))}
    </div>
  )
}
