import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { gsap, useGSAP } from '@/lib/gsap'
import { getAllPosts, getPostBySlug, type BlogPost } from '@/lib/blogService'
import { formatDate, type Post, type PostBlock } from '@/content/blog'
import CTASection from '@/components/sections/CTASection'

/* ─── Reading progress bar ──────────────────────────────────────── */
function ProgressBar() {
  const [pct, setPct] = useState(0)
  useEffect(() => {
    const update = () => {
      const el = document.documentElement
      const total = el.scrollHeight - el.clientHeight
      setPct(total > 0 ? (el.scrollTop / total) * 100 : 0)
    }
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])
  return (
    <div
      aria-hidden
      className="fixed left-0 top-0 z-[100] h-[2px] origin-left bg-brand"
      style={{ width: `${pct}%` }}
    />
  )
}

/* ─── Block renderer ─────────────────────────────────────────────── */
function Block({ block }: { block: PostBlock }) {
  switch (block.type) {
    case 'h2':
      return (
        <h2 className="bp-block mt-14 mb-5 font-display text-[clamp(1.7rem,3vw,2.5rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-foreground">
          {block.text}
        </h2>
      )
    case 'h3':
      return (
        <h3 className="bp-block mt-10 mb-4 font-display text-[1.5rem] font-semibold tracking-[-0.025em] text-foreground">
          {block.text}
        </h3>
      )
    case 'quote':
      return (
        <blockquote className="bp-block my-12 border-l-[3px] border-brand pl-8">
          <p className="font-display text-[clamp(1.35rem,2.6vw,2rem)] font-medium italic leading-[1.3] tracking-[-0.02em] text-foreground/90">
            &ldquo;{block.text}&rdquo;
          </p>
          {block.attribution && (
            <cite className="mt-4 block text-sm not-italic text-brand">— {block.attribution}</cite>
          )}
        </blockquote>
      )
    case 'ul':
      return (
        <ul className="bp-block my-8 space-y-4">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3 text-[1.05rem] leading-[1.8] text-muted-foreground">
              <span className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
              {item}
            </li>
          ))}
        </ul>
      )
    case 'p':
    default:
      return (
        <p className="bp-block my-6 text-[1.07rem] leading-[1.9] text-muted-foreground">
          {block.text}
        </p>
      )
  }
}

/* ─── Adapter ─────────────────────────────────────────────────────── */
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

/* ─── Main page ──────────────────────────────────────────────────── */
export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const root = useRef<HTMLDivElement>(null)

  const [post, setPost] = useState<Post | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) { navigate('/blog', { replace: true }); return }

    setLoading(true)

    Promise.all([getPostBySlug(slug), getAllPosts()])
      .then(([firestorePost, allFirestorePosts]) => {
        if (!firestorePost) {
          navigate('/blog', { replace: true })
          return
        }
        const current = toPost(firestorePost)
        setPost(current)

        // Related: same category, exclude current, max 3
        const allPosts = allFirestorePosts.map(toPost)
        const sameCat = allPosts.filter((p) => p.slug !== slug && p.category === current.category)
        setRelatedPosts(
          sameCat.length > 0
            ? sameCat.slice(0, 3)
            : allPosts.filter((p) => p.slug !== slug).slice(0, 3)
        )
      })
      .catch((err) => {
        console.error('[BlogPost] Firestore fetch failed:', err)
        navigate('/blog', { replace: true })
      })
      .finally(() => setLoading(false))
  }, [slug, navigate])

  useGSAP(
    () => {
      if (!post) return
      gsap.from('.bp-cover', { scale: 1.06, duration: 1.4, ease: 'power4.out' })
      gsap.from('.bp-hd-inner > *', {
        y: 28,
        opacity: 0,
        duration: 0.75,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.3,
      })
      gsap.utils.toArray<HTMLElement>('.bp-block', root.current).forEach((el) => {
        gsap.from(el, {
          y: 18,
          opacity: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 91%', once: true },
        })
      })
    },
    { scope: root, dependencies: [post] },
  )

  if (loading || !post) return null

  return (
    <>
      <ProgressBar />
      <div ref={root} className="bg-paper">

        {/* Full-bleed cover */}
        <div className="relative w-full overflow-hidden" style={{ height: 'min(75vh, 600px)' }}>
          <img
            src={post.cover}
            alt={post.title}
            className="bp-cover h-full w-full object-cover"
            loading="eager"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to top, rgba(5,8,6,1) 0%, rgba(5,8,6,0.55) 50%, rgba(5,8,6,0.15) 100%)',
            }}
          />
          <div className="absolute inset-x-0 bottom-0 px-5 pb-10 md:px-10 lg:px-16 xl:px-24">
            <header className="bp-hd-inner flex max-w-5xl flex-col gap-5">
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  to="/blog"
                  className="cursor-target flex items-center gap-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-white/50 transition-colors hover:text-white"
                >
                  <span>&larr;</span> Journal
                </Link>
                <span className="h-3 w-px bg-white/20" />
                <span className="rounded-full border border-brand/40 bg-brand/10 px-3 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-brand backdrop-blur-sm">
                  {post.category}
                </span>
              </div>
              <h1 className="font-display text-[clamp(1.8rem,3.8vw,3.5rem)] font-semibold leading-[0.96] tracking-[-0.045em] text-white">
                {post.title}
              </h1>
              <div className="flex items-center gap-5 text-sm text-white/50">
                <span className="tabular-nums">{formatDate(post.date)}</span>
                <span className="h-3 w-px bg-white/20" />
                <span className="tabular-nums">{post.readTime} min read</span>
              </div>
            </header>
          </div>
        </div>

        {/* Article body */}
        <div className="mx-auto w-full max-w-4xl px-5 pb-24 pt-14 md:px-10 lg:px-8 xl:px-0">
          <p className="bp-block mb-10 border-b border-border pb-10 text-[1.2rem] font-medium leading-[1.7] text-foreground/80">
            {post.excerpt}
          </p>
          <article>
            {post.body.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </article>
        </div>

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <section className="border-t border-border">
            <div className="border-b border-border px-5 py-6 md:px-10 lg:px-16 xl:px-24">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
                Keep reading
              </p>
            </div>
            <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((rp) => (
                <Link
                  key={rp.slug}
                  to={`/blog/${rp.slug}`}
                  className="cursor-target group block bg-paper"
                >
                  <div
                    className="relative overflow-hidden"
                    style={{ aspectRatio: '16/9', background: rp.coverGradient }}
                  >
                    <img
                      src={rp.cover}
                      alt={rp.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6 md:p-7">
                    <span className="mb-2 block text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-brand">
                      {rp.category}
                    </span>
                    <h3 className="font-display text-xl font-semibold leading-[1.1] tracking-[-0.025em] text-foreground transition-colors group-hover:text-brand">
                      {rp.title}
                    </h3>
                    <p className="mt-2 text-sm tabular-nums text-muted-foreground/60">
                      {rp.readTime} min read
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
      <CTASection />
    </>
  )
}
