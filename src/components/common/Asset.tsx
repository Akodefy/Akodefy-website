import { useState } from 'react'
import { cn } from '@/lib/utils'

interface AssetProps {
  src: string
  alt?: string
  className?: string
  /** Pass true for the page's LCP image (e.g. hero-frame) to hint the browser to fetch early */
  priority?: boolean
}

/** Image from /public/assets. Shows a quiet pattern until the file exists. */
export default function Asset({ src, alt = '', className, priority = false }: AssetProps) {
  const [failed, setFailed] = useState(false)
  if (failed) return <div aria-hidden className={cn('pattern-rings', className)} />
  return (
    <img
      src={src}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      // @ts-expect-error fetchpriority is a valid HTML attribute not yet in React types
      fetchpriority={priority ? 'high' : 'auto'}
      onError={() => setFailed(true)}
      className={className}
    />
  )
}
