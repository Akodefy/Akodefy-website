import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { testimonials, testimonialsHeading } from '@/content/site'

/**
 * One pinned stage. The heading introduces it, then each client takes the whole screen in turn:
 * the quote lights up word by word as you scroll, a counter rolls to the next number, and a segmented
 * line fills. Scrolling back reverses it.
 */
export default function TestimonialsSection() {
  const root = useRef<HTMLElement>(null)
  const n = testimonials.length

  useGSAP(
    () => {
      const el = root.current
      if (!el || !n) return

      const slides = gsap.utils.toArray<HTMLElement>('.tm-slide', el) // [0] is the heading, then one per client
      const segs = gsap.utils.toArray<HTMLElement>('.tm-seg', el)

      gsap.set(slides, { autoAlpha: 0 })
      gsap.set(slides[0], { autoAlpha: 1 })
      gsap.set('.tm-left', { autoAlpha: 0 })
      gsap.set('.tm-word', { opacity: 0.14 })
      gsap.set('.tm-meta', { autoAlpha: 0 })

      // Heading rises into place as the section arrives (plays once, not tied to scrub).
      gsap.from('.tm-iw', {
        yPercent: 115,
        duration: 1.1,
        stagger: 0.07,
        ease: 'power4.out',
        scrollTrigger: { trigger: el, start: 'top 75%', once: true },
      })

      const tl = gsap.timeline({
        defaults: { ease: 'power2.out' },
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: `+=${(n + 1) * 100}%`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
        },
      })

      let c = 0.7 // dwell on the heading
      tl.to(slides[0], { autoAlpha: 0, y: -50, duration: 0.5 }, c)
      tl.to('.tm-left', { autoAlpha: 1, duration: 0.4 }, c + 0.2)

      for (let i = 1; i <= n; i++) {
        const slide = slides[i]
        const words = slide.querySelectorAll('.tm-word')
        const meta = slide.querySelector('.tm-meta')
        const at = c + 0.25

        tl.fromTo(slide, { autoAlpha: 0, y: 60 }, { autoAlpha: 1, y: 0, duration: 0.6 }, at)
        tl.to('.tm-strip', { yPercent: -((i - 1) * 100) / n, duration: 0.5 }, at)
        tl.to(words, { opacity: 1, ease: 'none', duration: 0.35, stagger: { each: 1.1 / words.length } }, at + 0.4)
        tl.fromTo(meta, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.5 }, at + 1.2)
        tl.to(segs[i - 1], { scaleX: 1, ease: 'none', duration: 2.4 }, at)

        const hold = at + 2.4
        if (i < n) {
          tl.to(slide, { autoAlpha: 0, y: -60, duration: 0.5 }, hold)
          c = hold - 0.25
        } else {
          tl.to({}, { duration: 0.6 }, hold)
        }
      }
    },
    { scope: root },
  )

  if (!n) return null

  const pad = (v: number) => String(v).padStart(2, '0')

  return (
    <section ref={root} className="h-svh bg-paper p-3 md:p-4">
      <div className="relative isolate flex h-full overflow-hidden rounded-[2rem] bg-forest text-white md:rounded-[2.75rem]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_60%_at_12%_90%,rgba(25,196,107,0.24),transparent_70%)]"
        />

        <div className="container-x relative grid h-full w-full items-center gap-6 py-20 md:grid-cols-12 md:gap-10 md:py-0">
          {/* Counter and progress */}
          <div className="tm-left flex items-end justify-between gap-6 md:col-span-3 md:h-[58svh] md:flex-col md:items-start md:justify-between">
            <div className="flex items-end gap-3">
              <div className="h-[0.9em] overflow-hidden font-display text-[clamp(4.5rem,13vw,12rem)] font-semibold leading-[0.9] tracking-[-0.06em] text-brand">
                <div className="tm-strip">
                  {testimonials.map((_, i) => (
                    <div key={i} className="h-[0.9em]">
                      {pad(i + 1)}
                    </div>
                  ))}
                </div>
              </div>
              <span className="pb-2 text-xl text-white/40 md:pb-4 md:text-2xl">/ {pad(n)}</span>
            </div>
            <div className="flex w-full max-w-[16rem] gap-2" aria-hidden>
              {testimonials.map((_, i) => (
                <div key={i} className="h-[3px] flex-1 bg-white/15">
                  <div className="tm-seg h-full origin-left scale-x-0 bg-brand" />
                </div>
              ))}
            </div>
          </div>

          {/* Stage */}
          <div className="relative h-[56svh] md:col-span-9 md:h-[58svh]">
            <div className="tm-slide absolute inset-0 flex items-center">
              <h2 className="font-display text-[clamp(2.6rem,6.8vw,6.75rem)] font-semibold leading-[0.96] tracking-[-0.045em]">
                {testimonialsHeading.split(' ').map((w, i) => (
                  <span key={i} className="mr-[0.25em] inline-block overflow-hidden pb-[0.14em] align-bottom">
                    <span className="tm-iw inline-block">{w}</span>
                  </span>
                ))}
              </h2>
            </div>

            {testimonials.map((t) => (
              <figure key={t.name} className="tm-slide absolute inset-0 flex flex-col justify-center">
                <span aria-hidden className="mb-7 block h-[3px] w-16 bg-brand" />
                <blockquote className="font-display text-[clamp(1.6rem,3.3vw,3.4rem)] font-medium leading-[1.12] tracking-[-0.03em]">
                  {t.quote.split(' ').map((w, i) => (
                    <span key={i} className="tm-word mr-[0.25em] inline-block">
                      {w}
                    </span>
                  ))}
                </blockquote>
                <figcaption className="tm-meta mt-8 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span className="text-xl font-semibold">{t.name}</span>
                  <span className="text-white/60">
                    {t.role}, {t.company}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}