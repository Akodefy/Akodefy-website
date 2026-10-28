import { useRef } from 'react'
import { useGSAP } from '@/lib/gsap'
import { gsap } from '@/lib/gsap'
import SplitHeading from '@/components/common/SplitHeading'
import { partners, partnersHeading } from '@/content/site'

if (!partners.length) {
  console.warn('PartnersSection: no partners defined in site.ts')
}

/** Single logo — eager loaded, GPU layer via translateZ */
function Logo({ name, logo }: { name: string; logo: string }) {
  return (
    <li className="mx-8 flex shrink-0 items-center justify-center md:mx-12">
      <img
        src={logo}
        alt={name}
        title={name}
        loading="eager"
        decoding="async"
        draggable={false}
        style={{ mixBlendMode: 'screen' }}
        className="
          h-14 w-auto max-w-[12rem] select-none object-contain
          grayscale opacity-60
          transition-opacity duration-300
          hover:opacity-100
          md:h-16 md:max-w-[15rem]
        "
      />
    </li>
  )
}

/** One infinite marquee track — 4× duplication guarantees no gap on any screen width */
function Track({ items, reverse }: { items: typeof partners; reverse?: boolean }) {
  // 4× so the seam never appears even on 4K screens
  const quad = [...items, ...items, ...items, ...items]

  return (
    <div
      className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
      // Pause on hover via CSS animation-play-state
      style={{ '--play': 'running' } as React.CSSProperties}
      onMouseEnter={(e) =>
        ((e.currentTarget.querySelector('ul') as HTMLElement).style.animationPlayState = 'paused')
      }
      onMouseLeave={(e) =>
        ((e.currentTarget.querySelector('ul') as HTMLElement).style.animationPlayState = 'running')
      }
    >
      <ul
        className={`flex w-max items-center py-4 ${
          reverse ? 'animate-marquee-reverse' : 'animate-marquee'
        }`}
        // Isolate stacking context so GSAP opacity on parent doesn't affect compositing
        style={{ isolation: 'isolate' }}
      >
        {quad.map((p, i) => (
          <Logo key={`${p.name}-${i}`} name={p.name} logo={p.logo} />
        ))}
      </ul>
    </div>
  )
}

export default function PartnersSection() {
  const root = useRef<HTMLElement>(null)

  const mid = Math.ceil(partners.length / 2)
  const row1 = partners.slice(0, mid)
  const row2 = partners.slice(mid)

  useGSAP(
    () => {
      // Animate heading and sub — NOT the tracks, to avoid fighting the CSS animation
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
      // Fade the track WRAPPER only — never animate the scrolling ul itself
      gsap.from('.ps-tracks', {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        delay: 0.25,
        scrollTrigger: { trigger: root.current, start: 'top 85%', once: true },
      })
    },
    { scope: root },
  )

  if (!partners.length) return null

  return (
    <section ref={root} className="overflow-hidden bg-paper py-12 md:py-16">
      {/* Heading */}
      <div className="container-x mb-8 md:mb-10">
        <div className="ps-heading">
          <SplitHeading
            text={partnersHeading}
            className="font-display text-[clamp(1.8rem,3vw,3rem)] font-semibold tracking-[-0.04em] text-foreground"
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