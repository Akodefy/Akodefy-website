/**
 * Dynamic Blog Page - Loads content from Firestore
 * This replaces the static blog.ts content
 */

import { useRef, useState, useEffect } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import BlogFeatured from '@/components/blog/BlogFeatured'
import PostGrid from '@/components/blog/PostGrid'
import CategoryFilter from '@/components/blog/CategoryFilter'
import CTASection from '@/components/sections/CTASection'
import { getAllPosts, getFeaturedPost, type BlogPost } from '@/lib/blogService'
import { RefreshCw } from 'lucide-react'

export default function BlogPageDynamic() {
  const root = useRef<HTMLDivElement>(null)
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [featuredPost, setFeaturedPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  useEffect(() => {
    async function loadPosts() {
      try {
        const [allPosts, featured] = await Promise.all([getAllPosts(), getFeaturedPost()])
        setPosts(allPosts)
        setFeaturedPost(featured)
      } catch (error) {
        console.error('Failed to load blog posts:', error)
      } finally {
        setLoading(false)
      }
    }

    loadPosts()
  }, [])

  useGSAP(
    () => {
      if (loading) return

      gsap.from('.fade-in-up', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.12,
      })
    },
    { scope: root, dependencies: [loading] }
  )

  // Filter posts by category (excluding featured)
  const nonFeaturedPosts = posts.filter((p) => !p.featured)
  const filteredPosts =
    selectedCategory === 'All'
      ? nonFeaturedPosts
      : nonFeaturedPosts.filter((p) => p.category === selectedCategory)

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-paper">
        <div className="flex items-center gap-3 text-white/70">
          <RefreshCw className="size-5 animate-spin text-brand" />
          <span>Loading articles...</span>
        </div>
      </div>
    )
  }

  return (
    <div ref={root} className="min-h-screen bg-paper">
      {/* Featured Post Hero */}
      {featuredPost && <BlogFeatured post={featuredPost} />}

      {/* Category Filter */}
      <section className="container-x py-12 md:py-16">
        <div className="fade-in-up">
          <CategoryFilter
            selected={selectedCategory}
            onSelect={setSelectedCategory}
            categories={['All', ...Array.from(new Set(posts.map((p) => p.category)))]}
          />
        </div>
      </section>

      {/* Posts Grid */}
      <section className="container-x pb-20">
        {filteredPosts.length === 0 ? (
          <div className="flex h-64 flex-col items-center justify-center text-center">
            <p className="text-xl text-white/60">No articles found in this category</p>
            <button
              type="button"
              onClick={() => setSelectedCategory('All')}
              className="mt-4 text-sm text-brand hover:underline"
            >
              View all articles
            </button>
          </div>
        ) : (
          <div className="fade-in-up">
            <PostGrid posts={filteredPosts} />
          </div>
        )}
      </section>

      {/* CTA */}
      <CTASection />
    </div>
  )
}
