import { useState, useEffect, type FormEvent } from 'react'
import {
  getAllPostsAdmin,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  togglePostStatus,
  type BlogPost,
  type BlogPostInput,
  formatDate,
} from '@/lib/blogService'
import { uploadImageToCloudinary, isCloudinaryConfigured } from '@/lib/cloudinary'
import {
  FileText,
  Plus,
  Trash2,
  Edit3,
  Eye,
  EyeOff,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Upload,
  Image as ImageIcon,
  Star,
  Tag,
  Calendar,
  Clock,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const BLOG_CATEGORIES = [
  'Performance',
  'Design',
  'Growth',
  'Strategy',
  'Engineering',
  'Process',
  'Conversion',
  'Marketing',
  'SEO',
]

interface BlogFormState {
  id?: string
  slug: string
  title: string
  category: string
  date: string
  readTime: number
  excerpt: string
  cover: string
  coverGradient: string
  featured: boolean
  bodyJson: string // JSON stringified body blocks
  active: boolean
}

const emptyForm: BlogFormState = {
  slug: '',
  title: '',
  category: 'Engineering',
  date: new Date().toISOString().split('T')[0],
  readTime: 5,
  excerpt: '',
  cover: '',
  coverGradient: 'linear-gradient(135deg, #0a2e1a 0%, #0c4d2a 40%, #1a6b3a 70%, #2BFF88 100%)',
  featured: false,
  bodyJson: JSON.stringify([{ type: 'p', text: '' }], null, 2),
  active: true,
}

export default function BlogManager() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [formState, setFormState] = useState<BlogFormState>(emptyForm)
  const [saving, setSaving] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState('')

  const cloudinaryConfigured = isCloudinaryConfigured()

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    setLoading(true)
    try {
      const data = await getAllPostsAdmin()
      setPosts(data)
    } catch (err) {
      console.error(err)
      showToast('Failed to load blog posts')
    } finally {
      setLoading(false)
    }
  }

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 4000)
  }

  const handleOpenAdd = () => {
    setFormState(emptyForm)
    setModalOpen(true)
  }

  const handleOpenEdit = (post: BlogPost) => {
    setFormState({
      id: post.id,
      slug: post.slug,
      title: post.title,
      category: post.category,
      date: post.date,
      readTime: post.readTime,
      excerpt: post.excerpt,
      cover: post.cover,
      coverGradient: post.coverGradient,
      featured: post.featured,
      bodyJson: JSON.stringify(post.body, null, 2),
      active: post.active,
    })
    setModalOpen(true)
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!cloudinaryConfigured) {
      showToast('Cloudinary is not configured. Please set environment variables.')
      return
    }

    setUploading(true)
    setUploadProgress('Uploading image...')

    try {
      const result = await uploadImageToCloudinary(file, 'akodefy-blog')
      setFormState((prev) => ({ ...prev, cover: result.secure_url }))
      setUploadProgress('Upload complete!')
      showToast('Image uploaded successfully!')
    } catch (err) {
      console.error(err)
      showToast('Failed to upload image')
    } finally {
      setUploading(false)
      setTimeout(() => setUploadProgress(''), 2000)
    }
  }

  const handleSavePost = async (e: FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      // Parse and validate body JSON
      let body
      try {
        body = JSON.parse(formState.bodyJson)
      } catch {
        showToast('Invalid JSON in body content')
        setSaving(false)
        return
      }

      // Generate slug from title if empty
      const slug =
        formState.slug ||
        formState.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '')

      const postData: BlogPostInput = {
        slug,
        title: formState.title.trim(),
        category: formState.category,
        date: formState.date,
        readTime: formState.readTime,
        excerpt: formState.excerpt.trim(),
        cover: formState.cover.trim(),
        coverGradient: formState.coverGradient.trim(),
        featured: formState.featured,
        body,
        active: formState.active,
      }

      if (formState.id) {
        await updateBlogPost(formState.id, postData)
        showToast(`Post "${postData.title}" updated successfully!`)
      } else {
        await createBlogPost(postData)
        showToast(`Post "${postData.title}" created successfully!`)
      }

      setModalOpen(false)
      fetchPosts()
    } catch (err) {
      console.error(err)
      showToast('Failed to save post. Check console for details.')
    } finally {
      setSaving(false)
    }
  }

  const handleToggleActive = async (post: BlogPost) => {
    const nextStatus = !post.active
    try {
      await togglePostStatus(post.id, nextStatus)
      showToast(`Post is now ${nextStatus ? 'Published' : 'Draft'}`)
      fetchPosts()
    } catch (err) {
      console.error(err)
      showToast('Failed to update status')
    }
  }

  const handleDeletePost = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to permanently delete "${title}"?`)) {
      return
    }

    try {
      await deleteBlogPost(id)
      showToast(`Post "${title}" deleted.`)
      fetchPosts()
    } catch (err) {
      console.error(err)
      showToast('Failed to delete post')
    }
  }

  const filteredPosts = posts.filter((post) => {
    const matchesCategory = categoryFilter === 'All' || post.category === categoryFilter
    const matchesSearch =
      !searchQuery ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="space-y-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl border border-brand/30 bg-[#131915]/95 px-5 py-3 shadow-2xl backdrop-blur-md">
          <CheckCircle2 className="size-5 text-brand" />
          <span className="text-sm font-medium text-white">{toastMessage}</span>
        </div>
      )}

      {/* Header Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-white/10 bg-[#131915] p-5">
          <div className="flex items-center justify-between text-white/50">
            <span className="text-xs font-medium uppercase tracking-wider">Total Articles</span>
            <FileText className="size-4" />
          </div>
          <p className="mt-3 font-display text-3xl font-bold">{posts.length}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#131915] p-5">
          <div className="flex items-center justify-between text-white/50">
            <span className="text-xs font-medium uppercase tracking-wider">Published</span>
            <CheckCircle2 className="size-4 text-brand" />
          </div>
          <p className="mt-3 font-display text-3xl font-bold text-brand">
            {posts.filter((p) => p.active).length}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#131915] p-5">
          <div className="flex items-center justify-between text-white/50">
            <span className="text-xs font-medium uppercase tracking-wider">Featured</span>
            <Star className="size-4 text-yellow-500" />
          </div>
          <p className="mt-3 font-display text-3xl font-bold text-yellow-500">
            {posts.filter((p) => p.featured).length}
          </p>
        </div>

        <div className="flex flex-col justify-center rounded-2xl border border-brand/20 bg-brand/5 p-5">
          <button
            type="button"
            onClick={handleOpenAdd}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-3 text-sm font-semibold text-[#0c100e] transition hover:bg-white"
          >
            <Plus className="size-4 stroke-[2.5]" />
            <span>Create New Article</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 text-xs font-semibold uppercase tracking-wider text-white/40">
            Category:
          </span>
          {['All', ...BLOG_CATEGORIES].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategoryFilter(cat)}
              className={cn(
                'rounded-full px-3.5 py-1 text-xs font-medium transition',
                categoryFilter === cat
                  ? 'bg-brand text-[#0c100e]'
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-[#131915] px-3.5 py-2 text-xs text-white placeholder-white/30 focus:border-brand focus:outline-none"
          />
        </div>
      </div>

      {/* Posts List */}
      {loading ? (
        <div className="flex h-64 items-center justify-center rounded-2xl border border-white/10 bg-[#131915]">
          <div className="flex items-center gap-2 text-sm text-white/50">
            <RefreshCw className="size-4 animate-spin text-brand" />
            <span>Loading blog posts...</span>
          </div>
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="flex h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-[#131915] p-8 text-center">
          <FileText className="size-10 text-white/20" />
          <h3 className="mt-4 font-display text-base font-semibold">No articles found</h3>
          <p className="mt-1 text-xs text-white/50">
            {searchQuery || categoryFilter !== 'All'
              ? 'Try adjusting your filters'
              : 'Create your first blog post'}
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="group flex flex-col justify-between gap-6 rounded-2xl border border-white/10 bg-[#131915] p-6 transition-all hover:border-white/20 md:flex-row"
            >
              {/* Cover Image */}
              <div className="flex gap-4">
                <div className="relative size-24 shrink-0 overflow-hidden rounded-lg border border-white/10">
                  {post.cover ? (
                    <img src={post.cover} alt={post.title} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-white/5">
                      <ImageIcon className="size-6 text-white/20" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="font-display text-lg font-semibold tracking-tight text-white transition-colors group-hover:text-brand">
                      {post.title}
                    </h3>
                    {post.featured && (
                      <Star className="size-4 fill-yellow-500 text-yellow-500" />
                    )}
                    <span className="rounded-full bg-white/5 px-2.5 py-0.5 text-xs text-white/60 ring-1 ring-white/10">
                      {post.category}
                    </span>
                    <span
                      className={cn(
                        'rounded-full px-2.5 py-0.5 text-xs font-medium ring-1',
                        post.active
                          ? 'bg-brand/10 text-brand ring-brand/20'
                          : 'bg-white/5 text-white/40 ring-white/10'
                      )}
                    >
                      {post.active ? 'Published' : 'Draft'}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-white/50">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="size-3.5 text-brand" />
                      {formatDate(post.date)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="size-3.5" />
                      {post.readTime} min read
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Tag className="size-3.5" />
                      {post.slug}
                    </span>
                  </div>

                  <p className="line-clamp-2 max-w-2xl text-xs leading-relaxed text-white/60">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleToggleActive(post)}
                  title={post.active ? 'Unpublish' : 'Publish'}
                  className={cn(
                    'rounded-xl border p-2.5 text-xs transition',
                    post.active
                      ? 'border-brand/30 bg-brand/10 text-brand hover:bg-brand/20'
                      : 'border-white/10 bg-white/5 text-white/50 hover:bg-white/10 hover:text-white'
                  )}
                >
                  {post.active ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
                </button>

                <button
                  type="button"
                  onClick={() => handleOpenEdit(post)}
                  title="Edit Post"
                  className="rounded-xl border border-white/10 bg-white/5 p-2.5 text-xs text-white/70 transition hover:bg-white/10 hover:text-white"
                >
                  <Edit3 className="size-4" />
                </button>

                <button
                  type="button"
                  onClick={() => handleDeletePost(post.id, post.title)}
                  title="Delete Post"
                  className="rounded-xl border border-red-500/20 bg-red-500/5 p-2.5 text-xs text-red-400 transition hover:border-red-500/40 hover:bg-red-500/20"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create/Edit Modal */}
      {modalOpen && (
        <div
          data-lenis-prevent
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 backdrop-blur-sm sm:p-4"
        >
          <div
            data-lenis-prevent
            className="relative flex h-[90vh] max-h-[820px] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-white/15 bg-[#131915] shadow-2xl"
          >
            {/* Header */}
            <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-6 py-4 md:px-8">
              <div>
                <h2 className="font-display text-xl font-bold text-white">
                  {formState.id ? 'Edit Article' : 'Create New Article'}
                </h2>
                <p className="text-xs text-white/50">Fill in the blog post details below</p>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="rounded-full bg-white/5 p-2 text-white/50 transition hover:bg-white/10 hover:text-white"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSavePost} className="flex min-h-0 flex-1 flex-col overflow-hidden">
              {/* Scrollable Content */}
              <div
                data-lenis-prevent
                className="no-scrollbar flex-1 space-y-4 overflow-y-auto px-6 py-5 md:px-8"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {/* Title & Slug */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-white/60">
                      Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.title}
                      onChange={(e) => setFormState({ ...formState, title: e.target.value })}
                      placeholder="Your Website Performance IS Your Marketing Strategy"
                      className="mt-1.5 w-full rounded-xl border border-white/10 bg-black/40 px-3.5 py-2.5 text-sm text-white placeholder-white/20 focus:border-brand focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-white/60">
                      Slug (URL)
                    </label>
                    <input
                      type="text"
                      value={formState.slug}
                      onChange={(e) => setFormState({ ...formState, slug: e.target.value })}
                      placeholder="auto-generated-from-title"
                      className="mt-1.5 w-full rounded-xl border border-white/10 bg-black/40 px-3.5 py-2.5 text-sm text-white placeholder-white/20 focus:border-brand focus:outline-none"
                    />
                    <p className="mt-1 text-[10px] text-white/40">Leave empty to auto-generate</p>
                  </div>
                </div>

                {/* Category, Date, Read Time */}
                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-white/60">
                      Category
                    </label>
                    <select
                      value={formState.category}
                      onChange={(e) => setFormState({ ...formState, category: e.target.value })}
                      className="mt-1.5 w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2.5 text-sm text-white focus:border-brand focus:outline-none"
                    >
                      {BLOG_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat} className="bg-[#131915]">
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-white/60">
                      Date
                    </label>
                    <input
                      type="date"
                      required
                      value={formState.date}
                      onChange={(e) => setFormState({ ...formState, date: e.target.value })}
                      className="mt-1.5 w-full rounded-xl border border-white/10 bg-black/40 px-3.5 py-2.5 text-sm text-white focus:border-brand focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-white/60">
                      Read Time (min)
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={formState.readTime}
                      onChange={(e) =>
                        setFormState({ ...formState, readTime: parseInt(e.target.value) })
                      }
                      className="mt-1.5 w-full rounded-xl border border-white/10 bg-black/40 px-3.5 py-2.5 text-sm text-white focus:border-brand focus:outline-none"
                    />
                  </div>
                </div>

                {/* Excerpt */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/60">
                    Excerpt *
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={formState.excerpt}
                    onChange={(e) => setFormState({ ...formState, excerpt: e.target.value })}
                    placeholder="A compelling summary that appears in blog listings..."
                    className="mt-1.5 w-full rounded-xl border border-white/10 bg-black/40 px-3.5 py-2.5 text-sm text-white placeholder-white/20 focus:border-brand focus:outline-none"
                  />
                </div>

                {/* Cover Image */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/60">
                    Cover Image
                  </label>
                  <div className="mt-1.5 flex items-center gap-3">
                    <input
                      type="text"
                      value={formState.cover}
                      onChange={(e) => setFormState({ ...formState, cover: e.target.value })}
                      placeholder="https://res.cloudinary.com/..."
                      className="flex-1 rounded-xl border border-white/10 bg-black/40 px-3.5 py-2.5 text-sm text-white placeholder-white/20 focus:border-brand focus:outline-none"
                    />
                    <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-brand/30 bg-brand/10 px-4 py-2.5 text-xs font-medium text-brand transition hover:bg-brand/20">
                      <Upload className="size-4" />
                      <span>{uploading ? 'Uploading...' : 'Upload'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={uploading || !cloudinaryConfigured}
                        className="hidden"
                      />
                    </label>
                  </div>
                  {uploadProgress && (
                    <p className="mt-1 text-xs text-brand">{uploadProgress}</p>
                  )}
                  {!cloudinaryConfigured && (
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-yellow-500">
                      <AlertCircle className="size-3" />
                      Cloudinary not configured. Set environment variables to enable uploads.
                    </p>
                  )}
                  {formState.cover && (
                    <div className="mt-3">
                      <img
                        src={formState.cover}
                        alt="Preview"
                        className="h-32 w-auto rounded-lg border border-white/10"
                      />
                    </div>
                  )}
                </div>

                {/* Cover Gradient */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/60">
                    Cover Gradient (CSS)
                  </label>
                  <input
                    type="text"
                    value={formState.coverGradient}
                    onChange={(e) => setFormState({ ...formState, coverGradient: e.target.value })}
                    placeholder="linear-gradient(...)"
                    className="mt-1.5 w-full rounded-xl border border-white/10 bg-black/40 px-3.5 py-2.5 text-sm text-white placeholder-white/20 focus:border-brand focus:outline-none"
                  />
                </div>

                {/* Body (JSON) */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/60">
                    Body Content (JSON) *
                  </label>
                  <textarea
                    required
                    rows={12}
                    value={formState.bodyJson}
                    onChange={(e) => setFormState({ ...formState, bodyJson: e.target.value })}
                    placeholder='[{"type": "p", "text": "Content here..."}]'
                    className="mt-1.5 w-full rounded-xl border border-white/10 bg-black/40 px-3.5 py-2.5 font-mono text-xs text-white placeholder-white/20 focus:border-brand focus:outline-none"
                  />
                  <p className="mt-1 text-[10px] text-white/40">
                    Array of blocks: p, h2, h3, quote, ul. See existing posts for format.
                  </p>
                </div>

                {/* Toggles */}
                <div className="flex flex-wrap items-center gap-6">
                  <label className="flex cursor-pointer items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={formState.featured}
                      onChange={(e) => setFormState({ ...formState, featured: e.target.checked })}
                      className="size-4 rounded accent-brand"
                    />
                    <span className="text-sm text-white/70">Feature this post</span>
                  </label>

                  <label className="flex cursor-pointer items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={formState.active}
                      onChange={(e) => setFormState({ ...formState, active: e.target.checked })}
                      className="size-4 rounded accent-brand"
                    />
                    <span className="text-sm text-white/70">Publish immediately</span>
                  </label>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="flex shrink-0 items-center justify-between border-t border-white/10 px-6 py-4 md:px-8">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white/70 transition hover:bg-white/5 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 rounded-xl bg-brand px-6 py-2 text-sm font-semibold text-[#0c100e] transition hover:bg-white disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <RefreshCw className="size-4 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <span>{formState.id ? 'Update Article' : 'Create Article'}</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
