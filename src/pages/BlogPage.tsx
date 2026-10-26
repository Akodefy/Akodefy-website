import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import BlogFeatured from '@/components/blog/BlogFeatured'
import PostGrid from '@/components/blog/PostGrid'
import CTASection from '@/components/sections/CTASection'
import { featuredPost, nonFeaturedPosts } from '@/content/blog'

export default function BlogPage() {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.from('.bl-word', {
        y: '110%',
        duration: 1,
        stagger: 0.06,
        ease: 'power4.out',
        delay: 0.1,
      })
      gsap.from('.bl-sub', {
        opacity: 0,
        y: 12,
        duration: 0.7,
        ease: 'power3.out',
        delay: 0.55,
      })
    },
    { scope: root },
  )

  return (
    <div ref={root} className="bg-paper">
      {/* ── Masthead ── full-width, no container */}
      <header className="overflow-hidden border-b border-border px-5 pb-8 pt-28 md:px-10 md:pt-36 lg:px-16 xl:px-24">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="bl-sub mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand">
              Akodefy Journal
            </p>
            <div className="overflow-hidden">
              <div className="flex flex-wrap gap-x-4">
                {['Thinking', 'out', 'loud.'].map((w) => (
                  <span
                    key={w}
                    className="bl-word inline-block font-display text-[clamp(2.4rem,4.5vw,5rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-foreground"
                  >
                    {w}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <p className="bl-sub shrink-0 text-sm tabular-nums text-muted-foreground">
            {nonFeaturedPosts.length + 1} articles
          </p>
        </div>
      </header>

      {/* ── Featured post — edge-to-edge ── */}
      <BlogFeatured post={featuredPost} />

      {/* ── Divider label ── */}
      <div className="flex items-center gap-4 border-b border-border px-5 py-5 md:px-10 lg:px-16 xl:px-24">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          More articles
        </span>
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs tabular-nums text-muted-foreground/50">
          {nonFeaturedPosts.length} posts
        </span>
      </div>

      {/* ── Post grid — edge-to-edge ── */}
      <PostGrid posts={nonFeaturedPosts} />

      <CTASection />
    </div>
  )
}

