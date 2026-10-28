/**
 * Firestore service for dynamic blog content management
 */

import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
  type Timestamp,
} from 'firebase/firestore'
import { db } from './firebase'

export type PostBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'quote'; text: string; attribution?: string }
  | { type: 'ul'; items: string[] }

export interface BlogPost {
  id: string
  slug: string
  title: string
  category: string
  date: string
  readTime: number
  excerpt: string
  cover: string
  coverGradient: string
  featured: boolean
  body: PostBlock[]
  active: boolean
  createdAt?: Timestamp
  updatedAt?: Timestamp
}

export interface BlogPostInput {
  slug: string
  title: string
  category: string
  date: string
  readTime: number
  excerpt: string
  cover: string
  coverGradient: string
  featured: boolean
  body: PostBlock[]
  active: boolean
}

const COLLECTION = 'blog_posts'

/** Fetch all documents ordered by date desc — requires single-field index on 'date' */
async function fetchAll(): Promise<BlogPost[]> {
  if (!db) throw new Error('Firestore is not initialized')
  const snap = await getDocs(query(collection(db, COLLECTION), orderBy('date', 'desc')))
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as BlogPost))
}

/** All active posts — used on the public blog listing */
export async function getAllPosts(): Promise<BlogPost[]> {
  const all = await fetchAll()
  return all.filter((p) => p.active === true)
}

/** All posts including drafts — used in the admin portal */
export async function getAllPostsAdmin(): Promise<BlogPost[]> {
  return fetchAll()
}

/** Single active post by slug — used on the post detail page */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const all = await fetchAll()
  return all.find((p) => p.slug === slug && p.active === true) ?? null
}

/** Create a new post */
export async function createBlogPost(postData: BlogPostInput): Promise<string> {
  if (!db) throw new Error('Firestore is not initialized')
  const ref = await addDoc(collection(db, COLLECTION), {
    ...postData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
  return ref.id
}

/** Update an existing post */
export async function updateBlogPost(postId: string, updates: Partial<BlogPostInput>): Promise<void> {
  if (!db) throw new Error('Firestore is not initialized')
  await updateDoc(doc(db, COLLECTION, postId), {
    ...updates,
    updatedAt: serverTimestamp(),
  })
}

/** Delete a post */
export async function deleteBlogPost(postId: string): Promise<void> {
  if (!db) throw new Error('Firestore is not initialized')
  await deleteDoc(doc(db, COLLECTION, postId))
}

/** Toggle published / draft */
export async function togglePostStatus(postId: string, active: boolean): Promise<void> {
  await updateBlogPost(postId, { active })
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
