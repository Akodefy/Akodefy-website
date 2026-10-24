import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { careers } from '@/content/site'

export default function HiringSteps() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>('.hs-step', root.current).forEach((step, i) => {
        const fromX = i % 2 === 0 ? -60 : 60
        gsap.from(step, {
          x: fromX,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: step, start: 'top 85%', once: true },
        })
      })

      // Ghost numbers drift slightly at a different parallax rate
      gsap.utils.toArray<HTMLElement>('.hs-ghost', root.current).forEach((ghost) => {
        gsap.to(ghost, {
          y: -30,
          ease: 'none',
          scrollTrigger: {
            trigger: ghost.parentElement,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} className="bg-paper overflow-hidden py-24 md:py-40">
      <div className="container-x mb-16 md:mb-20">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand">
          Hiring process
        </p>
        <h2 className="mt-4 font-display text-[clamp(2.4rem,5.5vw,5rem)] font-semibold leading-[0.98] tracking-[-0.045em]">
          Fast, fair, and transparent.
        </h2>
      </div>

      {careers.applicationProcess.map((s, i) => {
        const isEven = i % 2 !== 0
        return (
          <div
            key={s.no}
            className={`hs-step relative border-t border-border py-14 md:py-20 ${isEven ? 'bg-forest/40' : ''}`}
          >
            <div className="container-x relative flex flex-col gap-6 md:flex-row md:items-center md:gap-0">
              {/* Ghost number — absolutely positioned behind content */}
              <span
                aria-hidden
                className={`hs-ghost pointer-events-none absolute select-none font-display font-semibold leading-none text-white/[0.04] ${isEven ? '-right-6 md:-right-8' : '-left-6 md:-left-8'}`}
                style={{ fontSize: 'clamp(8rem, 22vw, 20rem)', top: '-0.15em' }}
              >
                {s.no}
              </span>

              {/* Step number label */}
              <div
                className={`relative z-10 shrink-0 md:w-[4rem] ${isEven ? 'md:order-last md:text-right' : ''}`}
              >
                <span className="font-display text-xl font-medium text-brand">{s.no}</span>
              </div>

              {/* Content */}
              <div
                className={`relative z-10 flex-1 ${isEven ? 'md:pr-20 md:text-right' : 'md:pl-20'}`}
              >
                <h3 className="font-display text-[clamp(2rem,4vw,3.75rem)] font-semibold leading-none tracking-[-0.04em]">
                  {s.title}
                </h3>
                <p className={`mt-5 text-lg text-muted-foreground ${isEven ? 'md:ml-auto' : ''} max-w-lg`}>
                  {s.desc}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </section>
  )
}
