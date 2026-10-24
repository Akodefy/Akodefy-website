import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { CurvedLoop, ScrollReveal } from '@/components/rb'
import Asset from '@/components/common/Asset'
import { ArrowUpRight } from '@/components/common/icons'
import { gsap, useGSAP } from '@/lib/gsap'
import { about, site } from '@/content/site'

// Built from the approach statements already on the site, so it adds no new claims.
const text = about.checks.join('   /   ')
const mission = about.values[0]

/**
 * The CEO card. Save a portrait at public/assets/team/ceo.webp: transparent background,
 * waist-up, subject touching the bottom edge, 1200x1500.
 * Add the name when you have it. With no name the card shows the title on its own.
 */
const CEO = { image: '/assets/team/ceo.webp', name: '', title: 'CEO' }

const whatsapp = site.socials.find((s) => s.label === 'WhatsApp')?.href ?? '#'
const direct = [
  { label: 'Email', value: site.contact.email, href: `mailto:${site.contact.email}` },
  { label: 'Phone', value: site.contact.phone, href: site.contact.phoneHref },
  { label: 'WhatsApp', value: 'Chat with us', href: whatsapp, external: true },
]

function MailIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="m4 8 8 6 8-6" />
    </svg>
  )
}

/** Live local time for the studio's city. Real, not decorative. */
function LocalTime() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(id)
  }, [])
  const time = new Intl.DateTimeFormat('en-IN', {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
    timeZone: 'Asia/Kolkata',
  }).format(now)
  return (
    <p className="text-sm text-white/50">
      Coimbatore, local time <span className="tabular-nums text-white">{time}</span>
    </p>
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

      // Entrance: the card swings in and settles, then the text and the right-hand column follow.
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
        .from('.sec-in', { y: 40, opacity: 0, duration: 1, stagger: 0.12, ease: 'power3.out' }, 0.3)

      if (reduce) return

      // Idle: a slow float and a breathing glow.
      gsap.to('.ceo-float', { y: -10, duration: 3.2, ease: 'sine.inOut', yoyo: true, repeat: -1 })
      gsap.to('.ceo-glow', { opacity: 0.55, scale: 1.12, duration: 3.6, ease: 'sine.inOut', yoyo: true, repeat: -1 })
      // Pointer: tilt in 3D, shift the layers at different depths, light up the foil.
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
        card.style.setProperty('--mx', `${(nx + 0.5) * 100}%`)
        card.style.setProperty('--my', `${(ny + 0.5) * 100}%`)
        card.style.setProperty('--ang', `${(nx + 0.5) * 360}deg`)
        gsap.to('.ceo-shine, .ceo-foil', { opacity: 0, duration: 0, overwrite: 'auto' })
      }
      const leave = () => {
        ry(0)
        rx(0)
        px(0)
        py(0)
        gx(0)
        gy(0)
        gsap.to('.ceo-shine, .ceo-foil', { opacity: 0, duration: 0.7, overwrite: 'auto' })
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
        <div className="relative flex items-center justify-center px-6 py-24 md:py-16">
          <div className="ceo-float relative z-10">
            <div className="ceo-tilt">
              <div
                className="ceo-shell relative w-[min(86vw,22rem)] rounded-[2.25rem] bg-white/[0.06] p-3 shadow-[0_50px_120px_-30px_rgba(43,255,136,0.35)] ring-1 ring-white/15 backdrop-blur-sm"
                style={{ touchAction: 'pan-y' }}
              >
                <div className="ceo-card relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-gradient-to-b from-forest-2 via-forest to-forest [--ang:0deg] [--mx:50%] [--my:50%]">
                  {/* Faint dot lattice */}
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-50 [background-image:radial-gradient(rgba(43,255,136,0.3)_1.2px,transparent_1.4px)] [background-size:22px_22px] [mask-image:radial-gradient(70%_70%_at_50%_35%,black,transparent)]"
                  />
                  {/* Glow behind the subject */}
                  <div aria-hidden className="ceo-glow absolute left-1/2 top-[22%] size-[75%] -translate-x-1/2 rounded-full bg-brand/35 opacity-35 blur-3xl" />

                  <Asset
                    src={CEO.image}
                    alt={CEO.name ? `${CEO.name}, ${CEO.title} of ${site.name}` : `${CEO.title} of ${site.name}`}
                    className="ceo-photo absolute inset-0 h-full w-full scale-[1.08] object-cover object-top"
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

        {/* Right half: mission, the curved loop, and direct ways to reach the team */}
        <div className="flex flex-col justify-between gap-10 overflow-hidden py-14 md:gap-6 md:py-12">
          <div className="sec-in px-6 md:px-10 lg:px-14">
            <p className="mb-3 text-white/50">{mission.title}</p>
            <ScrollReveal
              baseOpacity={0.12}
              baseRotation={0}
              enableBlur
              blurStrength={5}
              textClassName="font-display text-[clamp(1.55rem,2.3vw,2.4rem)] font-medium leading-[1.12] tracking-[-0.03em]"
            >
              {mission.text}
            </ScrollReveal>
          </div>

          <div className="sec-in relative h-[13rem] overflow-hidden [&>div]:!h-full [&>div]:!min-h-0 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
            <CurvedLoop marqueeText={text} speed={2} curveAmount={240} direction="left" interactive />
          </div>

          <div className="sec-in px-6 md:px-10 lg:px-14">
            <p className="mb-2 text-white/50">Talk to us directly</p>
            <ul className="border-b border-white/10">
              {direct.map((d) => (
                <li key={d.label}>
                  <a
                    href={d.href}
                    {...(d.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="cursor-target group flex items-center gap-4 border-t border-white/10 py-3 transition-colors hover:border-brand"
                  >
                    <span className="w-24 shrink-0 text-sm text-white/50">{d.label}</span>
                    <span className="min-w-0 flex-1 truncate font-display text-lg font-medium tracking-[-0.02em] transition-colors group-hover:text-brand md:text-xl">
                      {d.value}
                    </span>
                    <ArrowUpRight className="size-5 shrink-0 text-white/40 transition-all duration-500 group-hover:rotate-45 group-hover:text-brand" />
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <LocalTime />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}