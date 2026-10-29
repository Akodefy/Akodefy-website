/**
 * SEOHead — injects per-page <title>, <meta>, <link canonical>, and JSON-LD
 * into <head> using direct DOM manipulation (no react-helmet needed).
 * Call once per page at the top of each page component.
 */
import { useEffect } from 'react'

interface SEOProps {
  title: string
  description: string
  canonical: string
  schema?: Record<string, unknown>
  ogType?: 'website' | 'article'
  image?: string
}

function setMeta(name: string, content: string, attr: 'name' | 'property' = 'name') {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setLink(rel: string, href: string) {
  let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export default function SEOHead({
  title,
  description,
  canonical,
  schema,
  ogType = 'website',
  image = 'https://www.akodefy.com/assets/og-image.png',
}: SEOProps) {
  useEffect(() => {
    // Title
    document.title = title

    // Core meta
    setMeta('description', description)
    setMeta('robots', 'index, follow')

    // Canonical
    setLink('canonical', canonical)

    // Open Graph
    setMeta('og:title', title, 'property')
    setMeta('og:description', description, 'property')
    setMeta('og:url', canonical, 'property')
    setMeta('og:type', ogType, 'property')
    setMeta('og:image', image, 'property')

    // Twitter
    setMeta('twitter:title', title)
    setMeta('twitter:description', description)

    // JSON-LD page-specific schema
    if (schema) {
      const id = 'page-schema-ld'
      let el = document.getElementById(id) as HTMLScriptElement | null
      if (!el) {
        el = document.createElement('script')
        el.id = id
        el.type = 'application/ld+json'
        document.head.appendChild(el)
      }
      el.textContent = JSON.stringify(schema)
    }

    // Cleanup on unmount
    return () => {
      document.getElementById('page-schema-ld')?.remove()
    }
  }, [title, description, canonical, schema, ogType, image])

  return null
}