import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap, useGSAP } from '@/lib/gsap'
import { nav, services, site } from '@/content/site'

const linkCls = 'cursor-target text-white/65 transition-colors hover:text-brand'

export default function Footer() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.fromTo(
        '.ft-mark',
        { yPercent: 30 },
        {
          yPercent: 0,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom bottom', scrub: true },
        },
      )
    },
    { scope: root },
  )

  const company = [...nav, { label: 'Blog', to: '/blog' }, { label: 'Careers', to: '/careers' }, { label: 'Contact', to: '/contact' }]

  return (
    <footer ref={root} className="overflow-hidden bg-forest text-white">
      <div className="container-x grid gap-14 pb-10 pt-24 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="max-w-sm font-display text-3xl font-medium leading-[1.1] tracking-[-0.03em]">
            IT solutions & digital growth for ambitious businesses worldwide.
          </p>
        </div>

        <div className="md:col-span-2">
          <p className="mb-5 text-sm text-white/45">Services</p>
          <ul className="space-y-3 text-[0.95rem]">
            {services.map((s) => (
              <li key={s.title}>
                <Link to="/services" className={linkCls}>
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <p className="mb-5 text-sm text-white/45">Company</p>
          <ul className="space-y-3 text-[0.95rem]">
            {company.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className={linkCls}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <p className="mb-5 text-sm text-white/45">Contact</p>
          <ul className="space-y-3 text-[0.95rem]">
            <li>
              <a href={`mailto:${site.contact.email}`} className={linkCls}>
                {site.contact.email}
              </a>
            </li>
            <li>
              <a href={site.contact.phoneHref} className={linkCls}>
                {site.contact.phone}
              </a>
            </li>
            <li className="text-white/65">{site.contact.location}</li>
          </ul>
        </div>
      </div>

      <div className="container-x flex flex-wrap items-center justify-between gap-4 border-t border-white/10 py-6 text-sm text-white/50">
        <p>© {new Date().getFullYear()} {site.legalName}. All rights reserved.</p>
        <ul className="flex gap-6">
          {site.socials.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noopener noreferrer" className={linkCls}>
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div aria-hidden className="relative">
        <div className="ft-mark pointer-events-none select-none whitespace-nowrap text-center font-display text-[clamp(7rem,27vw,30rem)] font-semibold leading-[0.74] tracking-[-0.07em] text-brand/90">
          akodefy
        </div>
        <div className="pointer-events-none absolute inset-x-0 -bottom-[20%] top-[75%] bg-gradient-to-b from-transparent to-forest/60 backdrop-blur-2xl [mask-image:linear-gradient(to_bottom,transparent,black_55%)]" />
        <div className="pointer-events-none absolute inset-x-0 -bottom-[20%] top-[86%] backdrop-blur-[64px] [mask-image:linear-gradient(to_bottom,transparent,black_60%)]" />
      </div>
    </footer>
  )
}
