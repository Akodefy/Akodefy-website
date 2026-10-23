import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { CurvedLoop } from '@/components/rb'
import Asset from '@/components/common/Asset'
import { gsap, useGSAP } from '@/lib/gsap'
import { about, site } from '@/content/site'

// Built from the approach statements already on the site, so it adds no new claims.
const text = about.checks.join('   /   ')

/**
 * The CEO card. Save a portrait at public/assets/team/ceo.webp: transparent background,
 * waist-up, subject touching the bottom edge, 1200x1500.
 * Add the name when you have it. With no name the card shows the title on its own.
 */
const CEO = { image: '/assets/team/ceo.webp', name: '', title: 'CEO' }

function MailIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="m4 8 8 6 8-6" />
    </svg>
  )
}

export default function CurvedLoopSection() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const el = root.current
      if (!el) return
      const shell = el.querySelector<HTMLElement>('.ceo-shell')
      const card = el.querySelector<HTMLElement>('.ceo-card')
      if (!shell || !card) return

      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      let ready = false

      gsap.set('.ceo-tilt', { transformPerspective: 1100 })

      // Entrance: the card swings in from the side and settles, then the text follows.
      const intro = gsap.timeline({
        scrollTrigger: { trigger: el, start: 'top 70%', once: true },
        onComplete: () => {
          ready = true
        },
      })
      intro
        .from('.ceo-tilt', { rotationY: -30, rotationX: 12, y: 70, scale: 0.92, opacity: 0, duration: 1.5, ease: 'power4.out' })
        .from('.ceo-photo', { y: 50, opacity: 0, duration: 1.1, ease: 'power3.out' }, 0.35)
        .from('.ceo-line', { y: 22, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }, 0.8)

      if (reduce) return

      // Idle: a slow float, and a soft glow that breathes.
      gsap.to('.ceo-float', { y: -10, duration: 3.2, ease: 'sine.inOut', yoyo: true, repeat: -1 })
      gsap.to('.ceo-glow', { opacity: 0.55, scale: 1.12, duration: 3.6, ease: 'sine.inOut', yoyo: true, repeat: -1 })

      // Pointer: tilt in 3D and shift the layers at different depths.
      const rx = gsap.quickTo('.ceo-tilt', 'rotationX', { duration: 0.6, ease: 'power3' })
      const ry = gsap.quickTo('.ceo-tilt', 'rotationY', { duration: 0.6, ease: 'power3' })
      const px = gsap.quickTo('.ceo-photo', 'x', { duration: 0.7, ease: 'power3' })
      const py = gsap.quickTo('.ceo-photo', 'y', { duration: 0.7, ease: 'power3' })
      const gx = gsap.quickTo('.ceo-glow', 'x', { duration: 0.9, ease: 'power3' })
      const gy = gsap.quickTo('.ceo-glow', 'y', { duration: 0.9, ease: 'power3' })

      const move = (e: PointerEvent) => {
        if (!ready || e.pointerType === 'touch') return
        const r = shell.getBoundingClientRect()
        const nx = (e.clientX - r.left) / r.width - 0.5
        const ny = (e.clientY - r.top) / r.height - 0.5
        ry(nx * 18)
        rx(-ny * 18)
        px(nx * 14)
        py(ny * 10)
        gx(nx * -40)
        gy(ny * -40)
      }
      const leave = () => {
        ry(0)
        rx(0)
        px(0)
        py(0)
        gx(0)
        gy(0)
      }
      shell.addEventListener('pointermove', move)
      shell.addEventListener('pointerleave', leave)
      return () => {
        shell.removeEventListener('pointermove', move)
        shell.removeEventListener('pointerleave', leave)
      }
    },
    { scope: root },
  )

  const primary = CEO.name || CEO.title
  const secondary = CEO.name ? CEO.title : ''

  return (
    <section ref={root} aria-label="Our CEO and how we work" className="overflow-hidden bg-forest-2 text-white">
      <div className="grid md:min-h-svh md:grid-cols-2">
        {/* Left half: animated profile card */}
        <div className="flex items-center justify-center px-6 py-20 md:py-16">
          <div className="ceo-float">
            <div className="ceo-tilt">
              <div
                className="ceo-shell relative w-[min(86vw,22rem)] rounded-[2.25rem] bg-white/[0.06] p-3 shadow-[0_50px_120px_-30px_rgba(25,196,107,0.4)] ring-1 ring-white/15 backdrop-blur-sm"
                style={{ touchAction: 'pan-y' }}
              >
                <div className="ceo-card relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-gradient-to-b from-forest-2 via-forest to-forest [--ang:0deg] [--mx:50%] [--my:50%]">
                  {/* Faint dot lattice */}
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-50 [background-image:radial-gradient(rgba(25,196,107,0.35)_1.2px,transparent_1.4px)] [background-size:22px_22px] [mask-image:radial-gradient(70%_70%_at_50%_35%,black,transparent)]"
                  />
                  {/* Glow behind the subject */}
                  <div aria-hidden className="ceo-glow absolute left-1/2 top-[22%] size-[75%] -translate-x-1/2 rounded-full bg-brand/35 opacity-35 blur-3xl" />

                  <Asset
                    src={CEO.image}
                    alt={CEO.name ? `${CEO.name}, ${CEO.title} of ${site.name}` : `${CEO.title} of ${site.name}`}
                    className="ceo-photo absolute inset-0 h-full w-full object-cover object-top"
                  />



                  {/* Name plate */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest via-forest/70 to-transparent px-6 pb-6 pt-20">
                    <p className="ceo-line font-display text-[1.9rem] font-semibold leading-none tracking-[-0.03em]">{primary}</p>
                    {secondary && <p className="ceo-line mt-2 text-white/70">{secondary}</p>}
                  </div>
                </div>

                {/* Footer row */}
                <div className="flex items-center justify-between gap-4 px-3 pb-2 pt-4">
                  <div className="ceo-line min-w-0">
                    <p className="truncate font-semibold">{site.legalName}</p>
                    <p className="truncate text-sm text-white/60">{site.contact.location}</p>
                  </div>
                  <Link
                    to="/contact"
                    className="cursor-target ceo-line flex shrink-0 items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-sm font-semibold ring-1 ring-white/15 transition-colors hover:bg-brand hover:text-forest"
                  >
                    <MailIcon className="size-4" />
                    Contact
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right half: the curved text loop, faded at both edges */}
        <div className="flex items-center overflow-hidden pb-16 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] md:pb-0">
          <div className="w-full">
            <CurvedLoop marqueeText={text} speed={2} curveAmount={300} direction="left" interactive />
          </div>
        </div>
      </div>
    </section>
  )
}