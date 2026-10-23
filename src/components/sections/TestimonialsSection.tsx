import { useRef } from 'react'
import SplitHeading from '@/components/common/SplitHeading'
import { gsap, useGSAP } from '@/lib/gsap'
import { testimonials, testimonialsHeading } from '@/content/site'
import { cn } from '@/lib/utils'

// Cards sit at different heights and widths so the row reads as a loose, hand-placed wall.
const lift = ['mt-0', 'mt-20', 'mt-8', 'mt-28', 'mt-12', 'mt-24']
const widths = [
  'w-[22rem] md:w-[26rem]',
  'w-[22rem] md:w-[30rem]',
  'w-[22rem] md:w-[25rem]',
  'w-[22rem] md:w-[28rem]',
  'w-[22rem] md:w-[27rem]',
  'w-[22rem] md:w-[26rem]',
]

const initials = (name: string) =>
  name
    .replace(/[^A-Za-z ]/g, '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join('')
    .toUpperCase()

function Card({ t, i, hidden }: { t: (typeof testimonials)[number]; i: number; hidden?: boolean }) {
  const highlight = i % 3 === 1
  return (
    <figure
      aria-hidden={hidden || undefined}
      className={cn(
        'tm-card mr-6 shrink-0 select-none rounded-[1.75rem] p-8 md:p-10',
        lift[i % lift.length],
        widths[i % widths.length],
        highlight ? 'bg-brand text-forest' : 'bg-forest text-white',
      )}
    >
      <blockquote className="text-[1.05rem] leading-[1.55] md:text-[1.2rem]">{t.quote}</blockquote>
      <figcaption className="mt-10 flex items-center gap-4">
        <span
          aria-hidden
          className={cn(
            'grid size-12 shrink-0 place-items-center rounded-full font-display text-lg font-semibold',
            highlight ? 'bg-forest text-brand' : 'bg-brand text-forest',
          )}
        >
          {initials(t.name)}
        </span>
        <span className="min-w-0">
          <span className="block font-semibold">{t.name}</span>
          <span className="block text-sm opacity-70">
            {t.role}, {t.company}
          </span>
        </span>
        <span aria-hidden className="ml-auto self-end font-display text-[5rem] leading-[0.6] opacity-25">
          ”
        </span>
      </figcaption>
    </figure>
  )
}

/**
 * A wall of quotes that drifts sideways forever. Drag it, flick it, or hover to slow it down.
 */
export default function TestimonialsSection() {
  const root = useRef<HTMLElement>(null)
  const viewport = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const bubble = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const vp = viewport.current
      const tr = track.current
      const bb = bubble.current
      if (!vp || !tr || !bb || !testimonials.length) return

      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const auto = reduce ? 0 : 0.7 // px per 60fps frame
      let x = 0
      let v = 0
      let W = 0
      let lastX = 0
      let dragging = false
      let hovering = false
      let inView = false

      const measure = () => {
        W = tr.scrollWidth / 2 // two identical halves
      }
      measure()
      document.fonts.ready.then(measure)
      window.addEventListener('resize', measure)

      // Pause ticker when section is off-screen — saves GPU on every other page
      const visObs = new IntersectionObserver(
        ([e]) => { inView = e.isIntersecting },
        { rootMargin: '100px' },
      )
      visObs.observe(vp)

      gsap.set(bb, { xPercent: -50, yPercent: -50, scale: 0, opacity: 0 })
      const bx = gsap.quickTo(bb, 'x', { duration: 0.35, ease: 'power3' })
      const by = gsap.quickTo(bb, 'y', { duration: 0.35, ease: 'power3' })

      const tick = (_time: number, deltaTime: number) => {
        if (!inView) return
        const d = deltaTime / 16.667
        if (!dragging) {
          x += (-auto * (hovering ? 0.35 : 1) + v) * d
          v *= Math.pow(0.92, d)
        }
        if (W) x = gsap.utils.wrap(-W, 0, x)
        tr.style.transform = `translateX(${x}px)`
      }
      gsap.ticker.add(tick)

      const down = (e: PointerEvent) => {
        dragging = true
        lastX = e.clientX
        v = 0
        vp.setPointerCapture(e.pointerId)
        gsap.to(bb, { scale: 0.8, duration: 0.2 })
      }
      const move = (e: PointerEvent) => {
        const r = vp.getBoundingClientRect()
        bx(e.clientX - r.left)
        by(e.clientY - r.top)
        if (dragging) {
          const dx = e.clientX - lastX
          lastX = e.clientX
          x += dx
          v = dx
        }
      }
      const up = () => {
        dragging = false
        gsap.to(bb, { scale: hovering ? 1 : 0, opacity: hovering ? 1 : 0, duration: 0.3 })
      }
      const enter = () => {
        hovering = true
        gsap.to(bb, { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(2)' })
      }
      const leave = () => {
        hovering = false
        if (!dragging) gsap.to(bb, { scale: 0, opacity: 0, duration: 0.25 })
      }

      vp.addEventListener('pointerdown', down)
      vp.addEventListener('pointermove', move)
      vp.addEventListener('pointerup', up)
      vp.addEventListener('pointercancel', up)
      vp.addEventListener('pointerenter', enter)
      vp.addEventListener('pointerleave', leave)

      gsap.from('.tm-card', {
        y: 90,
        opacity: 0,
        duration: 1.1,
        ease: 'power3.out',
        stagger: 0.07,
        scrollTrigger: { trigger: vp, start: 'top 80%', once: true },
      })

      return () => {
        gsap.ticker.remove(tick)
        visObs.disconnect()
        window.removeEventListener('resize', measure)
        vp.removeEventListener('pointerdown', down)
        vp.removeEventListener('pointermove', move)
        vp.removeEventListener('pointerup', up)
        vp.removeEventListener('pointercancel', up)
        vp.removeEventListener('pointerenter', enter)
        vp.removeEventListener('pointerleave', leave)
      }
    },
    { scope: root },
  )

  if (!testimonials.length) return null

  return (
    <section ref={root} className="overflow-hidden bg-paper pt-24 pb-4 md:pt-40 md:pb-6">
      <div className="container-x text-center">
        <SplitHeading
          text={testimonialsHeading}
          className="mx-auto max-w-3xl font-display text-[clamp(2.6rem,6vw,5.5rem)] font-semibold leading-[0.98] tracking-[-0.045em]"
        />
      </div>

      <div
        ref={viewport}
        className="relative mt-16 min-h-[28rem] touch-pan-y [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] md:mt-24"
      >
        <div ref={track} className="flex w-max items-start will-change-transform">
          {testimonials.map((t, i) => (
            <Card key={`a-${t.name}`} t={t} i={i} />
          ))}
          {testimonials.map((t, i) => (
            <Card key={`b-${t.name}`} t={t} i={i} hidden />
          ))}
        </div>

        <div
          ref={bubble}
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 z-20 hidden size-24 place-items-center rounded-full bg-brand text-sm font-semibold text-forest [@media(hover:hover)]:grid"
        >
          Drag
        </div>
      </div>
    </section>
  )
}