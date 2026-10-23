import { useState } from 'react'
import { cn } from '@/lib/utils'

/** Image from /public/assets. Shows a quiet pattern until the file exists. */
export default function Asset({ src, alt = '', className }: { src: string; alt?: string; className?: string }) {
  const [failed, setFailed] = useState(false)
  if (failed) return <div aria-hidden className={cn('pattern-rings', className)} />
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={className}
    />
  )
}
