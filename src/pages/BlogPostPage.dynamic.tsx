/**
 * Dynamic Blog Post Page - Loads individual post from Firestore
 */

import { useRef, useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { gsap, useGSAP } from '@/lib/gsap'
import { getPostBySlug, getAllPosts, formatDate, type BlogPost, type PostBlock } from '@/lib/blogService'
import CTASection from '@/components/sections/CTASection'
import { ArrowLeft, Calendar, Clock, Tag, RefreshCw } from 'lucide-react'

export default function BlogPostPageDynamic() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const root = useRef<HTMLElement>(null)

  const [post, setPost] = useState<BlogPost | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    async function loadPost() {
      if (!slug) {
        setNotFound(true)
        setLoading(false)
        return
      }

      try {
        const [currentPost, allPosts] = await Promise.all([
          getPostBySlug(slug),
          getAllPosts(),
        ])

        if (!currentPost) {
          setNotFound(true)
          setLoading(false)
          return
        }

        setPost(currentPost)

        // Get related posts from same category
        const related = allPosts
          .filter((p) => p.category === currentPost.category && p.slug !== currentPost.slug)
          .slice(0, 3)
        setRelatedPosts(related)
      } catch (error) {
        console.error('Failed to load blog post:', error)
        setNotFound(true)
      } finally {
        setLoading(false)
      }
    }

    loadPost()
  }, [slug])

  useGSAP(
    () => {
      if (loading || !post) return

      gsap.from('.article-header', {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      })

      gsap.from('.article-body > *', {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.08,
        delay: 0.3,
      })
    },
    { scope: root, dependencies: [loading, post] }
  )

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-paper">
        <div className="flex items-center gap-3 text-white/70">
          <RefreshCw className="size-5 animate-spin text-brand" />
          <span>Loading article...</span>
        </div>
      </div>
    )
  }

  if (notFound || !post) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-paper px-5 text-center">
        <h1 className="font-display text-4xl font-bold text-white">Article Not Found</h1>
        <p className="mt-4 text-lg text-white/60">
          The article you're looking for doesn't exist or has been removed.
        </p>
        <Link
          to="/blog"
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-brand/60 bg-brand/10 px-6 py-3 text-sm font-semibold text-brand backdrop-blur-sm transition-all duration-300 hover:bg-brand hover:text-forest"
        >
          <ArrowLeft className="size-4" />
          <span>Back to Blog</span>
        </Link>
      </div>
    )
  }

  return (
    <article ref={root} className="min-h-screen bg-paper">
      {/* Hero Cover */}
      <section
        className="relative flex min-h-[60vh] items-end overflow-hidden"
        style={{
          background: post.coverGradient,
        }}
      >
        {/* Cover Image */}
        <div className="absolute inset-0">
          <img
            src={post.cover}
            alt={post.title}
            className="h-full w-full object-cover opacity-30"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest/95 via-forest/60 to-transparent" />
        </div>

        {/* Article Header */}
        <div className="article-header container-x relative pb-12 pt-24 md:pb-16">
          {/* Back Button */}
          <Link
            to="/blog"
            className="mb-8 inline-flex items-center gap-2 text-sm text-white/60 transition hover:text-brand"
          >
            <ArrowLeft className="size-4" />
            <span>Back to all articles</span>
          </Link>

          {/* Meta Row */}
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-brand/50 bg-brand/15 px-3 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-brand">
              {post.category}
            </span>
            <span className="h-3 w-px bg-white/20" />
            <span className="flex items-center gap-1.5 text-[0.65rem] tabular-nums text-white/40">
              <Calendar className="size-3.5" />
              {formatDate(post.date)}
            </span>
            <span className="h-3 w-px bg-white/20" />
            <span className="flex items-center gap-1.5 text-[0.65rem] tabular-nums text-white/40">
              <Clock className="size-3.5" />
              {post.readTime} min read
            </span>
          </div>

          {/* Title */}
          <h1 className="max-w-4xl font-display text-[clamp(2rem,4vw,4.5rem)] font-semibold leading-[0.97] tracking-[-0.045em] text-white">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="mt-6 max-w-2xl text-[1.05rem] leading-relaxed text-white/65">
            {post.excerpt}
          </p>
        </div>
      </section>

      {/* Article Body */}
      <section className="container-x py-16 md:py-24">
        <div className="article-body mx-auto max-w-3xl space-y-6">
          {post.body.map((block, i) => (
            <BlockRenderer key={i} block={block} />
          ))}
        </div>

        {/* Tags / Meta Footer */}
        <div className="mx-auto mt-16 flex max-w-3xl flex-wrap items-center gap-4 border-t border-white/10 pt-8">
          <span className="flex items-center gap-2 text-sm text-white/50">
            <Tag className="size-4" />
            <span>Topics:</span>
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/70">
            {post.category}
          </span>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="border-t border-white/10 bg-forest/50 py-16">
          <div className="container-x">
            <h2 className="mb-8 font-display text-2xl font-semibold text-white">
              More in {post.category}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  to={`/blog/${related.slug}`}
                  className="group block rounded-2xl border border-white/10 bg-paper p-5 transition hover:border-brand/40"
                >
                  <div className="mb-3 aspect-[16/9] overflow-hidden rounded-lg">
                    <img
                      src={related.cover}
                      alt={related.title}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="font-display text-lg font-semibold leading-tight text-white transition group-hover:text-brand">
                    {related.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-white/60">{related.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </article>
  )
}

// Block Renderer Component
function BlockRenderer({ block }: { block: PostBlock }) {
  switch (block.type) {
    case 'p':
      return <p className="text-[1.05rem] leading-relaxed text-white/80">{block.text}</p>

    case 'h2':
      return (
        <h2 className="mt-12 font-display text-[clamp(1.8rem,3vw,2.4rem)] font-semibold leading-tight tracking-tight text-white">
          {block.text}
        </h2>
      )

    case 'h3':
      return (
        <h3 className="mt-8 font-display text-[clamp(1.4rem,2.5vw,1.8rem)] font-semibold leading-tight tracking-tight text-white">
          {block.text}
        </h3>
      )

    case 'quote':
      return (
        <blockquote className="my-8 border-l-4 border-brand bg-brand/5 py-5 pl-6 pr-5">
          <p className="text-[1.1rem] italic leading-relaxed text-white/90">{block.text}</p>
          {block.attribution && (
            <footer className="mt-3 text-sm font-medium text-brand">— {block.attribution}</footer>
          )}
        </blockquote>
      )

    case 'ul':
      return (
        <ul className="space-y-3 pl-5">
          {block.items.map((item, i) => (
            <li key={i} className="relative pl-2 text-[1.05rem] leading-relaxed text-white/80">
              <span className="absolute -left-3 top-[0.6em] size-1.5 rounded-full bg-brand" />
              {item}
            </li>
          ))}
        </ul>
      )

    default:
      return null
  }
}
