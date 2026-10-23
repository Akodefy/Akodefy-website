import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'

/** Thin brand-green line at the top of the viewport that fills as the page is read. */
export default function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.to(bar.current, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: { start: 0, end: 'max', scrub: 0.2 },
    })
  })

  return (
    <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px]">
      <div ref={bar} className="h-full origin-left scale-x-0 bg-brand" />
    </div>
  )
}