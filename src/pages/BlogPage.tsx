import SEOHead from '@/components/common/SEOHead'
import { useRef, useState, useEffect } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import BlogFeatured from '@/components/blog/BlogFeatured'
import PostGrid from '@/components/blog/PostGrid'
import CategoryFilter from '@/components/blog/CategoryFilter'
import CTASection from '@/components/sections/CTASection'
import { getAllPosts, type BlogPost } from '@/lib/blogService'
import { type Post } from '@/content/blog'

// Adapter: Firestore BlogPost → Post shape the components expect
function toPost(p: BlogPost): Post {
  return {
    slug: p.slug,
    title: p.title,
    category: p.category,
    date: p.date,
    readTime: p.readTime,
    excerpt: p.excerpt,
    cover: p.cover,
    coverGradient: p.coverGradient,
    featured: p.featured,
    body: p.body as Post['body'],
  }
}

type LoadState = 'loading' | 'done' | 'error'

export default function BlogPage() {
  const root = useRef<HTMLDivElement>(null)
  const [allPosts, setAllPosts] = useState<Post[]>([])
  const [state, setState] = useState<LoadState>('loading')
  const [activeCategory, setActiveCategory] = useState('All')

  useEffect(() => {
    setState('loading')
    getAllPosts()
      .then((fp) => {
        setAllPosts(fp.map(toPost))
        setState('done')
      })
      .catch((err) => {
        console.error('[Blog] Firestore fetch failed:', err)
        setState('error')
      })
  }, [])

  const featured = allPosts.find((p) => p.featured) ?? allPosts[0] ?? null
  const nonFeatured = allPosts.filter((p) => !p.featured)
  const categories = ['All', ...Array.from(new Set(allPosts.map((p) => p.category)))]
  const filtered =
    activeCategory === 'All'
      ? nonFeatured
      : nonFeatured.filter((p) => p.category === activeCategory)

  useGSAP(
    () => {
      if (state !== 'done') return
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
    { scope: root, dependencies: [state] },
  )

  return (
    <div ref={root} className="bg-paper">
      {/* Masthead */}
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
            {state === 'done' ? `${allPosts.length} articles` : '—'}
          </p>
        </div>
      </header>

      <SEOHead title="Akodefy Journal — Web Development, Design & Growth Insights" description="Expert articles on web performance, UI/UX design, SEO, digital strategy, and engineering from the Akodefy team." canonical="https://www.akodefy.com/blog" />
      {/* Error banner */}
      {state === 'error' && (
        <div className="container-x py-4">
          <p className="text-sm text-red-400">
            Could not load articles — check your Firestore rules and network connection.
          </p>
        </div>
      )}

      {/* Featured post */}
      {featured && <BlogFeatured post={featured} />}

      {/* Category filter — only show once posts are loaded */}
      {state === 'done' && allPosts.length > 0 && (
        <CategoryFilter
          active={activeCategory}
          onChange={setActiveCategory}
          categories={categories}
        />
      )}

      {/* Divider label */}
      {state === 'done' && (
        <div className="flex items-center gap-4 border-b border-border px-5 py-5 md:px-10 lg:px-16 xl:px-24">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            {activeCategory === 'All' ? 'More articles' : activeCategory}
          </span>
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs tabular-nums text-muted-foreground/50">
            {filtered.length} posts
          </span>
        </div>
      )}

      {/* Post grid */}
      <PostGrid posts={filtered} />

      <CTASection />
    </div>
  )
}
