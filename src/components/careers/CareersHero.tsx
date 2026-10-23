import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { careers } from '@/content/site'

/**
 * Full-viewport hero.
 * Layout: eyebrow top-left · massive left-aligned headline fills the centre ·
 * stat strip pinned to the bottom edge.
 * Animation: each element reveals via a bottom-to-top clip-path curtain —
 * completely different from the y-offset stagger used on the Home hero.
 */
export default function CareersHero() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const ease = 'power4.inOut'

      gsap.timeline({ defaults: { ease } })
        .fromTo(
          '.ch-eyebrow',
          { clipPath: 'inset(0 0 100% 0)', opacity: 0 },
          { clipPath: 'inset(0 0 0% 0)', opacity: 1, duration: 0.7 },
          0.2,
        )
        .fromTo(
          '.ch-line',
          { clipPath: 'inset(0 0 100% 0)' },
          { clipPath: 'inset(0 0 0% 0)', duration: 1.05, stagger: 0.12 },
          0.5,
        )
        .fromTo(
          '.ch-stat',
          { clipPath: 'inset(0 0 100% 0)', opacity: 0 },
          { clipPath: 'inset(0 0 0% 0)', opacity: 1, duration: 0.6, stagger: 0.09 },
          1.1,
        )
        .fromTo(
          '.ch-cta',
          { opacity: 0, scale: 0.92 },
          { opacity: 1, scale: 1, duration: 0.55, stagger: 0.08 },
          1.25,
        )

      // Subtle parallax: headline drifts up as you scroll off
      gsap.to('.ch-headline', {
        yPercent: -12,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    },
    { scope: root },
  )

  return (
    <section
      ref={root}
      className="relative flex min-h-svh flex-col overflow-hidden bg-forest text-white pt-28 md:pt-36"
    >
      {/* Subtle radial halo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_40%_at_80%_60%,rgba(43,255,136,0.1),transparent_70%)]"
      />

      <div className="container-x flex flex-1 flex-col">
        {/* Eyebrow */}
        <p className="ch-eyebrow text-sm font-semibold uppercase tracking-[0.14em] text-brand [clip-path:inset(0_0_100%_0)]">
          Careers at Akodefy
        </p>

        {/* Headline — two lines animate independently */}
        <div className="ch-headline mt-10 flex-1 flex items-center">
          <h1 className="font-display font-semibold leading-[0.86] tracking-[-0.06em]"
            style={{ fontSize: 'clamp(4.5rem, 13vw, 16rem)' }}>
            <span className="ch-line block [clip-path:inset(0_0_100%_0)]">We're</span>
            <span className="ch-line block text-brand [clip-path:inset(0_0_100%_0)]">hiring.</span>
          </h1>
        </div>

        {/* Bottom strip */}
        <div className="mt-10 grid gap-8 border-t border-white/12 pt-6 pb-10 md:grid-cols-2 md:items-end md:pb-12">
          {/* Stats */}
          <div className="flex flex-wrap gap-x-8 gap-y-2">
            {[
              `${careers.openRoles.length} open positions`,
              'Remote-first',
              'Coimbatore, India',
            ].map((s) => (
              <span key={s} className="ch-stat text-sm text-white/55 [clip-path:inset(0_0_100%_0)]">
                {s}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 md:justify-end">
            <a
              href="#open-roles"
              className="ch-cta cursor-target inline-flex h-12 items-center justify-center rounded-full bg-brand px-7 text-sm font-medium text-forest opacity-0 transition-colors hover:bg-white"
            >
              View open roles
            </a>
            <a
              href="#apply"
              className="ch-cta cursor-target inline-flex h-12 items-center justify-center rounded-full px-7 text-sm font-medium opacity-0 ring-1 ring-white/25 transition-colors hover:text-brand hover:ring-brand"
            >
              Apply now
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
