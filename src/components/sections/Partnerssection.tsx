import { useRef } from 'react'
import { useGSAP } from '@/lib/gsap'
import { gsap } from '@/lib/gsap'
import SplitHeading from '@/components/common/SplitHeading'
import { partners, partnersHeading } from '@/content/site'

if (!partners.length) {
  // eslint-disable-next-line no-console
  console.warn('PartnersSection: no partners defined in site.ts')
}

/** Single logo item — no card, no tile, no colour reveal on hover */
function Logo({ name, logo }: { name: string; logo: string }) {
  return (
    <li className="mx-8 flex shrink-0 items-center justify-center md:mx-12">
      <img
        src={logo}
        alt={name}
        title={name}
        loading="lazy"
        draggable={false}
        style={{ mixBlendMode: 'screen' }}
        className="
          h-10 w-auto max-w-[9rem] select-none object-contain
          grayscale opacity-75
          transition-opacity duration-400
          hover:opacity-100
          md:h-12 md:max-w-[11rem]
        "
      />
    </li>
  )
}

/** One infinite marquee track */
function Track({ items, reverse }: { items: typeof partners; reverse?: boolean }) {
  // Duplicate for seamless loop
  const doubled = [...items, ...items]

  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <ul
        className={`
          flex w-max items-center py-4
          ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}
        `}
      >
        {doubled.map((p, i) => (
          <Logo key={`${p.name}-${i}`} name={p.name} logo={p.logo} />
        ))}
      </ul>
    </div>
  )
}

export default function PartnersSection() {
  const root = useRef<HTMLElement>(null)

  // Split the 21 logos roughly in half for two rows
  const mid = Math.ceil(partners.length / 2)
  const row1 = partners.slice(0, mid)
  const row2 = partners.slice(mid)

  useGSAP(
    () => {
      gsap.from('.ps-heading', {
        opacity: 0,
        y: 24,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 85%', once: true },
      })
      gsap.from('.ps-sub', {
        opacity: 0,
        y: 16,
        duration: 0.7,
        ease: 'power3.out',
        delay: 0.15,
        scrollTrigger: { trigger: root.current, start: 'top 85%', once: true },
      })
      gsap.from('.ps-tracks', {
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
        delay: 0.3,
        scrollTrigger: { trigger: root.current, start: 'top 85%', once: true },
      })
    },
    { scope: root },
  )

  if (!partners.length) return null

  return (
    <section ref={root} className="overflow-hidden bg-paper py-20 md:py-28">
      {/* Heading */}
      <div className="container-x mb-14 md:mb-16">
        <div className="ps-heading">
          <SplitHeading
            text={partnersHeading}
            className="font-display text-[clamp(2rem,5vw,3.75rem)] font-semibold tracking-[-0.04em] text-foreground"
          />
        </div>
        <p className="ps-sub mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
          Brands that trust us to build and grow their digital presence.
        </p>
      </div>

      {/* Two marquee rows */}
      <div className="ps-tracks space-y-2">
        <Track items={row1} />
        <Track items={row2} reverse />
      </div>
    </section>
  )
}