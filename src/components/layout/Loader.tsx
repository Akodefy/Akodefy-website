import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'

/**
 * Tracks real asset readiness:
 *   0–20%  fonts ready
 *   20–90% images loaded (proportional to count resolved)
 *   90%    pauses until window load fires
 *   100%   complete → slide off
 */
export default function Loader({ onReveal, onDone }: { onReveal: () => void; onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const countRef = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      const html = document.documentElement
      html.style.overflow = 'hidden'

      let current = 0

      const setProgress = (p: number) => {
        if (p <= current) return
        current = p
        if (countRef.current) countRef.current.textContent = String(Math.round(p))
        if (barRef.current) barRef.current.style.width = `${p}%`
      }

      // Collect all img elements (including those added during render)
      const getImages = () => Array.from(document.querySelectorAll<HTMLImageElement>('img'))

      const loadImages = (): Promise<void> =>
        new Promise((resolve) => {
          const imgs = getImages()
          if (!imgs.length) { resolve(); return }
          let done = 0
          const onOne = () => {
            done++
            // 20–90% range driven by image count
            setProgress(20 + Math.round((done / imgs.length) * 70))
            if (done === imgs.length) resolve()
          }
          imgs.forEach((img) => {
            if (img.complete) { onOne(); return }
            img.addEventListener('load', onOne, { once: true })
            img.addEventListener('error', onOne, { once: true })
          })
        })

      const windowLoad = new Promise<void>((resolve) => {
        if (document.readyState === 'complete') resolve()
        else window.addEventListener('load', () => resolve(), { once: true })
      })

      const tl = gsap.timeline({
        onComplete: () => {
          html.style.overflow = ''
          onDone()
        },
      })

      // Entrance: letters rise up
      tl.from('.ld-letter', {
        yPercent: 115,
        duration: 0.9,
        ease: 'power4.out',
        stagger: 0.045,
      })

      // Phase 1: fonts ready → 20%
      tl.add(() => {
        tl.pause()
        document.fonts.ready.then(() => {
          setProgress(20)
          tl.play()
        })
      })

      // Phase 2: images loading (20–90%) + window.load
      tl.add(() => {
        tl.pause()
        Promise.all([loadImages(), windowLoad]).then(() => {
          setProgress(90)
          // Small deliberate pause at 90 before snapping to 100
          setTimeout(() => {
            setProgress(100)
            setTimeout(() => tl.play(), 300)
          }, 150)
        })
      })

      // Exit: letters fly out → panel slides up
      tl.to('.ld-letter', { yPercent: -115, duration: 0.65, ease: 'power3.in', stagger: 0.03 }, '+=0.15')
        .to(root.current, { yPercent: -100, duration: 1, ease: 'expo.inOut' }, '-=0.1')
        .add(onReveal, '-=0.65')

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
        <span ref={countRef} className="font-display text-sm tabular-nums text-brand">0</span>
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
            className="h-full bg-brand transition-[width] duration-300 ease-out"
            style={{ width: '0%' }}
          />
        </div>
        <p className="text-xs text-white/30">Loading assets</p>
      </div>
    </div>
  )
}

