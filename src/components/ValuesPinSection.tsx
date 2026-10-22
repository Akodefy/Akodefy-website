import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { about } from '@/content/site'

/**
 * Mission, Vision and Values take turns on one pinned screen, driven by scroll.
 */
export default function ValuesPinSection() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>('.val-item', root.current)
      const navs = gsap.utils.toArray<HTMLElement>('.val-nav', root.current)
      if (!items.length) return

      gsap.set(items, { autoAlpha: 0, yPercent: 10 })
      gsap.set(items[0], { autoAlpha: 1, yPercent: 0 })
      gsap.set(navs, { opacity: 0.3 })
      gsap.set(navs[0], { opacity: 1 })

      const dwell = 0.8
      const step = 1.3
      const total = dwell + (items.length - 1) * step + dwell

      const tl = gsap.timeline({
        defaults: { ease: 'power2.inOut' },
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: `+=${items.length * 100}%`,
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
        },
      })

      tl.to('.val-line', { scaleY: 1, ease: 'none', duration: total }, 0)
      items.forEach((item, i) => {
        if (i === 0) return
        const t = dwell + (i - 1) * step
        tl.to(items[i - 1], { autoAlpha: 0, yPercent: -10, duration: 0.5 }, t)
          .to(item, { autoAlpha: 1, yPercent: 0, duration: 0.5 }, t + 0.15)
          .to(navs[i - 1], { opacity: 0.3, duration: 0.3 }, t)
          .to(navs[i], { opacity: 1, duration: 0.3 }, t + 0.15)
      })
      tl.to({}, { duration: dwell }, total - dwell)
    },
    { scope: root },
  )

  return (
    <section ref={root} className="relative h-svh overflow-hidden bg-forest text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_80%_20%,rgba(25,196,107,0.22),transparent_70%)]"
      />
      <div className="container-x relative grid h-full items-center gap-10 md:grid-cols-12">
        <div className="relative flex gap-8 md:col-span-3 md:flex-col md:gap-5 md:pl-7">
          <div className="absolute bottom-0 left-0 top-0 hidden w-px bg-white/15 md:block">
            <div className="val-line h-full w-full origin-top scale-y-0 bg-brand" />
          </div>
          {about.values.map((v) => (
            <p key={v.title} className="val-nav font-display text-2xl font-medium tracking-[-0.03em] md:text-4xl">
              {v.title}
            </p>
          ))}
        </div>

        <div className="relative h-[55svh] md:col-span-9">
          {about.values.map((v) => (
            <div key={v.title} className="val-item absolute inset-0 flex items-center">
              <p className="font-display text-[clamp(2rem,5vw,5rem)] font-medium leading-[1.04] tracking-[-0.04em]">
                {v.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}