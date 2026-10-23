import { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
import { techHeading, techRows } from '@/content/site'
import { cn } from '@/lib/utils'

/**
 * Two rows of technology names drifting in opposite directions. Scrolling the page speeds them up,
 * then they ease back to a calm pace.
 */
export default function TechMarquee() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const tracks = gsap.utils.toArray<HTMLElement>('.tech-track', root.current)
      if (!tracks.length) return

      const tweens = tracks.map((track, i) =>
        gsap.fromTo(
          track,
          { xPercent: i % 2 === 0 ? 0 : -50 },
          { xPercent: i % 2 === 0 ? -50 : 0, duration: 36 + i * 10, ease: 'none', repeat: -1 },
        ),
      )

      let target = 1
      let current = 1
      ScrollTrigger.create({
        trigger: root.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          target = 1 + Math.min(Math.abs(self.getVelocity()) / 300, 6)
        },
      })
      const tick = () => {
        target += (1 - target) * 0.05
        current += (target - current) * 0.08
        tweens.forEach((t) => t.timeScale(current))
      }
      gsap.ticker.add(tick)
      return () => gsap.ticker.remove(tick)
    },
    { scope: root },
  )

  return (
    <section ref={root} aria-label={techHeading} className="overflow-hidden bg-brand py-16 text-forest md:py-24">
      <div className="container-x">
        <p className="text-lg font-medium md:text-xl">{techHeading}</p>
      </div>

      <ul className="sr-only">
        {techRows.flat().map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>

      <div aria-hidden className="mt-8 space-y-3 md:mt-12 md:space-y-5">
        {techRows.map((row, r) => (
          <div key={r} className="overflow-hidden">
            <div className="tech-track flex w-max">
              {[...row, ...row].map((name, i) => (
                <span key={`${name}-${i}`} className="flex items-center">
                  <span
                    className={cn(
                      'font-display text-[clamp(2.8rem,6.5vw,6rem)] font-semibold leading-[1.05] tracking-[-0.04em]',
                      (i + r) % 2 === 1 && 'text-transparent [-webkit-text-stroke:2px_#072A1E]',
                    )}
                  >
                    {name}
                  </span>
                  <span className="mx-6 size-3 shrink-0 rotate-45 bg-forest md:mx-10 md:size-4" />
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}