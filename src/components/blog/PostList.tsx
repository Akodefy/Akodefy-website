import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from '@/lib/gsap'
import { type Post, formatDate } from '@/content/blog'
import { cn } from '@/lib/utils'

type Props = {
  posts: Post[]
}

/** Left-edge leading zero, e.g. 1 → "01" */
const idx = (n: number) => String(n + 1).padStart(2, '0')

export default function PostList({ posts }: Props) {
  const listRef = useRef<HTMLUListElement>(null)

  // Animate rows on mount
  useEffect(() => {
    const items = listRef.current?.querySelectorAll<HTMLElement>('.pl-row')
    if (!items?.length) return
    gsap.fromTo(
      items,
      { y: 28, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.55, stagger: 0.07, ease: 'power3.out', clearProps: 'all' },
    )
  }, [])

  if (!posts.length) {
    return (
      <div className="container-x py-24 text-center text-muted-foreground">
        No articles yet.
      </div>
    )
  }

  return (
    <ul ref={listRef} className="container-x divide-y divide-border">
      {posts.map((post, i) => (
        <li key={post.slug} className="pl-row group">
          <Link
            to={`/blog/${post.slug}`}
            className="cursor-target grid grid-cols-[3rem_1fr] gap-5 py-10 md:grid-cols-[4rem_1fr_auto] md:items-start md:gap-8 md:py-12"
          >
            {/* Index */}
            <span className="mt-1 font-display text-2xl font-semibold tabular-nums text-muted-foreground/35 transition-colors duration-300 group-hover:text-brand/50 md:text-3xl">
              {idx(i)}
            </span>

            {/* Main content */}
            <div className="min-w-0">
              <div className="mb-3 flex flex-wrap items-center gap-3">
                <span className="inline-block rounded-full border border-border bg-white/5 px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  {post.category}
                </span>
                <span className="text-[0.7rem] tabular-nums text-muted-foreground/60">
                  {post.readTime} min read
                </span>
              </div>

              <h2
                className={cn(
                  'font-display text-[clamp(1.5rem,3.2vw,2.6rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-foreground transition-colors duration-300 group-hover:text-brand',
                )}
              >
                {post.title}
              </h2>

              <p className="mt-3 line-clamp-2 max-w-2xl text-base leading-relaxed text-muted-foreground md:mt-4 md:text-[1.05rem]">
                {post.excerpt}
              </p>
            </div>

            {/* Date + arrow — right column on desktop */}
            <div className="col-start-2 mt-4 flex items-center gap-4 md:col-auto md:mt-1 md:flex-col md:items-end md:gap-2">
              <span className="text-xs tabular-nums text-muted-foreground/60">
                {formatDate(post.date)}
              </span>
              <span className="inline-block translate-x-0 text-muted-foreground/40 transition-all duration-300 group-hover:translate-x-1 group-hover:text-brand">
                &rarr;
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}
