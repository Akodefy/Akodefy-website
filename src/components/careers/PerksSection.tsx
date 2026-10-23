import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { careers } from '@/content/site'

/**
 * Perks & benefits.
 * Layout: brand-green background, editorial two-column list.
 *   Each perk is a large label + small description, divided by hairlines.
 *   Even/odd columns are offset vertically by padding to create visual rhythm.
 * Animation: scale + opacity reveal per item — different from clip-path and x-slides elsewhere.
 */
export default function PerksSection() {
  const root = useRef<HTMLElement>(null)
  const left = careers.perks.filter((_, i) => i % 2 === 0)
  const right = careers.perks.filter((_, i) => i % 2 !== 0)

  useGSAP(
    () => {
      gsap.from('.cp-left .cp-item', {
        opacity: 0,
        x: -50,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: { trigger: '.cp-grid', start: 'top 82%', once: true },
      })
      gsap.from('.cp-right .cp-item', {
        opacity: 0,
        x: 50,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: { trigger: '.cp-grid', start: 'top 82%', once: true },
        delay: 0.12,
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} className="bg-brand py-24 text-forest md:py-40">
      <div className="container-x">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-6 md:mb-24">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-forest/45">
              Benefits
            </p>
            <h2 className="mt-4 font-display text-[clamp(2.4rem,5.5vw,5rem)] font-semibold leading-[0.98] tracking-[-0.045em]">
              What we offer
            </h2>
          </div>
          <p className="max-w-xs text-[0.95rem] text-forest/60">
            Real benefits, not ping-pong tables. We invest in the things that make a genuine difference to your working life.
          </p>
        </div>

        {/* Two staggered columns */}
        <div className="cp-grid grid gap-0 md:grid-cols-2 md:divide-x md:divide-forest/20">
          {/* Left column — starts flush */}
          <div className="cp-left divide-y divide-forest/20 md:pr-16">
            {left.map((p) => (
              <div key={p.label} className="cp-item py-8 md:py-10">
                <p className="font-display text-[clamp(1.5rem,2.6vw,2.1rem)] font-semibold tracking-[-0.035em]">
                  {p.label}
                </p>
                <p className="mt-2.5 text-[0.9rem] leading-relaxed text-forest/60 max-w-sm">
                  {p.text}
                </p>
              </div>
            ))}
          </div>

          {/* Right column — pushed down by top padding to stagger visually */}
          <div className="cp-right divide-y divide-forest/20 md:pl-16 md:pt-16">
            {right.map((p) => (
              <div key={p.label} className="cp-item py-8 md:py-10">
                <p className="font-display text-[clamp(1.5rem,2.6vw,2.1rem)] font-semibold tracking-[-0.035em]">
                  {p.label}
                </p>
                <p className="mt-2.5 text-[0.9rem] leading-relaxed text-forest/60 max-w-sm">
                  {p.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
