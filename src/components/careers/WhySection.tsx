import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { careers } from '@/content/site'

/**
 * Why Akodefy section.
 * Layout: three-column rows — muted step number | bold label | description.
 * Animation: each row slides in from the RIGHT (x-axis), not the usual y-axis stagger.
 * The delay is staggered by index but uses x-translation for a "wiping in" feel.
 */
export default function WhySection() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>('.cw-row', root.current).forEach((row, i) => {
        gsap.from(row, {
          x: 80,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: row, start: 'top 87%', once: true },
          delay: i * 0.06,
        })
      })

      // The section label slides in from the left — opposite direction
      gsap.from('.cw-label', {
        x: -40,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.cw-label', start: 'top 90%', once: true },
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} className="overflow-hidden bg-forest py-8 text-white md:py-14">
      <div className="container-x">
        <p className="cw-label mb-16 text-sm font-semibold uppercase tracking-[0.14em] text-brand md:mb-24">
          {careers.why.title}
        </p>

        <div>
          {careers.why.points.map((p, i) => (
            <div
              key={p.label}
              className="cw-row grid grid-cols-[2.5rem_1fr] items-start gap-6 border-t border-white/10 py-10 last:border-b md:grid-cols-[4rem_1fr_1fr] md:gap-12 md:py-14"
            >
              {/* Muted step number */}
              <span className="mt-1 font-display text-lg font-medium text-brand/40">
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* Label */}
              <h3 className="font-display text-2xl font-semibold leading-tight tracking-[-0.03em] md:text-[clamp(1.6rem,2.5vw,2.25rem)]">
                {p.label}
              </h3>

              {/* Description — on desktop sits in its own column */}
              <p className="col-start-2 text-[1.05rem] leading-relaxed text-white/60 md:col-start-3">
                {p.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

