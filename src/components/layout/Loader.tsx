import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'

/**
 * High-performance, buttery-smooth intro loader (1.2–1.6s total).
 * Smoothly animates progress 0 -> 100% with no network stalling.
 */
export default function Loader({ onReveal, onDone }: { onReveal: () => void; onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const countRef = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      const html = document.documentElement
      html.style.overflow = 'hidden'

      const progressObj = { value: 0 }

      const updateProgress = () => {
        const rounded = Math.round(progressObj.value)
        if (countRef.current) {
          countRef.current.textContent = String(rounded)
        }
        if (barRef.current) {
          barRef.current.style.width = `${progressObj.value}%`
        }
      }

      const tl = gsap.timeline({
        onComplete: () => {
          html.style.overflow = ''
          onDone()
        },
      })

      // 1. Letters rise up swiftly (0s - 0.5s)
      tl.from('.ld-letter', {
        yPercent: 110,
        duration: 0.5,
        ease: 'power3.out',
        stagger: 0.025,
      })

      // 2. Continuous, smooth 0 -> 100% progress counter (runs concurrently from 0.1s to 1.15s)
      tl.to(
        progressObj,
        {
          value: 100,
          duration: 1.05,
          ease: 'power2.inOut',
          onUpdate: updateProgress,
        },
        0.1,
      )

      // 3. Letters fly out swiftly as it completes 100%
      tl.to(
        '.ld-letter',
        {
          yPercent: -110,
          duration: 0.38,
          ease: 'power3.in',
          stagger: 0.018,
        },
        '>+0.05',
      )

      // 4. Panel slides off upwards, revealing the page
      tl.to(
        root.current,
        {
          yPercent: -100,
          duration: 0.7,
          ease: 'expo.inOut',
        },
        '<+0.12',
      )
        // Trigger page intro animations right as the curtain starts lifting
        .add(onReveal, '-=0.55')

      return () => {
        html.style.overflow = ''
      }
    },
    { scope: root },
  )

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[200] flex flex-col justify-between bg-forest p-6 text-white md:p-10"
      aria-label="Loading"
    >
      {/* Top row */}
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium tracking-wide text-white/50">Akodefy Info Tech</p>
        <span ref={countRef} className="font-display text-sm tabular-nums text-brand">
          0
        </span>
      </div>

      {/* Centre wordmark */}
      <div className="overflow-hidden pb-[0.12em]">
        <div className="font-display text-[clamp(4.5rem,20vw,19rem)] font-semibold leading-[0.82] tracking-[-0.07em]">
          {'akodefy'.split('').map((c, i) => (
            <span key={i} className="ld-letter inline-block">
              {c}
            </span>
          ))}
        </div>
      </div>

      {/* Progress bar */}
      <div className="space-y-3">
        <div className="h-px w-full bg-white/10">
          <div
            ref={barRef}
            className="h-full bg-brand"
            style={{ width: '0%' }}
          />
        </div>
        <p className="text-xs text-white/30">Loading assets</p>
      </div>
    </div>
  )
}
