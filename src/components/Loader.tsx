import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'

/**
 * Progress is tied to real readiness (fonts + window load), not a fixed timer.
 * It eases to 90 and waits for both, then completes.
 */
export default function Loader({ onReveal, onDone }: { onReveal: () => void; onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null)
  const count = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      const html = document.documentElement
      html.style.overflow = 'hidden'

      const state = { p: 0 }
      const render = () => {
        if (count.current) count.current.textContent = String(Math.round(state.p))
      }
      const loaded = Promise.all([
        document.fonts.ready,
        new Promise<void>((resolve) => {
          if (document.readyState === 'complete') resolve()
          else window.addEventListener('load', () => resolve(), { once: true })
        }),
      ])

      const tl = gsap.timeline({
        onComplete: () => {
          html.style.overflow = ''
          onDone()
        },
      })
      tl.from('.ld-letter', { yPercent: 115, duration: 1, ease: 'power4.out', stagger: 0.05 })
        .to(state, { p: 90, duration: 1.2, ease: 'power2.out', onUpdate: render }, 0)
        .add(() => {
          tl.pause()
          loaded.then(() => tl.play())
        })
        .to(state, { p: 100, duration: 0.35, ease: 'none', onUpdate: render })
        .to('.ld-letter', { yPercent: -115, duration: 0.7, ease: 'power3.in', stagger: 0.03 }, '+=0.2')
        .to(root.current, { yPercent: -100, duration: 1, ease: 'expo.inOut' }, '-=0.15')
        .add(onReveal, '-=0.6')

      return () => {
        html.style.overflow = ''
      }
    },
    { scope: root },
  )

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-forest p-6 text-white md:p-10"
      aria-label="Loading"
    >
      <p className="text-sm text-white/55">Akodefy Info Tech</p>
      <div className="overflow-hidden pb-[0.12em]">
        <div className="font-display text-[clamp(4.5rem,20vw,19rem)] font-semibold leading-[0.82] tracking-[-0.07em]">
          {'akodefy'.split('').map((c, i) => (
            <span key={i} className="ld-letter inline-block">
              {c}
            </span>
          ))}
        </div>
      </div>
      <div className="flex justify-end">
        <span ref={count} className="font-display text-[clamp(3rem,9vw,8rem)] font-medium leading-none tabular-nums text-brand">
          0
        </span>
      </div>
    </div>
  )
}
