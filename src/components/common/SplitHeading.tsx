import { useEffect, useRef } from 'react'
import { gsap, SplitText } from '@/lib/gsap'
import { whenReady } from '@/lib/ready'
import { cn } from '@/lib/utils'

type Props = {
  text: string
  as?: 'h1' | 'h2' | 'h3'
  /** 'load' plays once the loader has finished. 'scroll' plays when the heading enters view. */
  mode?: 'load' | 'scroll'
  delay?: number
  className?: string
}

/** Masked line-by-line reveal. Reserved for hero and page-opening headlines. */
export default function SplitHeading({ text, as = 'h2', mode = 'scroll', delay = 0, className }: Props) {
  const ref = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let cancelled = false
    const ctx = gsap.context(() => {})

    const start = async () => {
      await document.fonts.ready
      if (mode === 'load') await whenReady()
      if (cancelled) return
      ctx.add(() => {
        gsap.set(el, { opacity: 1 })
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
        SplitText.create(el, {
          type: 'lines',
          mask: 'lines',
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 115,
              duration: 1.1,
              ease: 'power4.out',
              stagger: 0.09,
              delay,
              scrollTrigger: mode === 'scroll' ? { trigger: el, start: 'top 88%', once: true } : undefined,
            }),
        })
      })
    }
    start()

    return () => {
      cancelled = true
      ctx.revert()
    }
  }, [text, mode, delay])

  const Tag = as
  return (
    <Tag ref={ref} className={cn('opacity-0', className)}>
      {text}
    </Tag>
  )
}
