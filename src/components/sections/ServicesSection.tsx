import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { DecryptedText } from '@/components/react-bits'
import Asset from '@/components/common/Asset'
import { gsap, useGSAP } from '@/lib/gsap'
import { services } from '@/content/site'
import { cn } from '@/lib/utils'

const themes = ['bg-ink text-forest', 'bg-brand text-forest', 'bg-emerald-deep text-white']

/**
 * Cards stack as you scroll: each one settles back and darkens while the next slides over it.
 */
export default function ServicesSection({ showHeader = true }: { showHeader?: boolean }) {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>('.svc-card', root.current)
      cards.forEach((card, i) => {
        const next = cards[i + 1]
        if (!next) return
        const trigger = { trigger: next, start: 'top 85%', end: 'top 15%', scrub: true }
        gsap.to(card, { scale: 0.93, ease: 'none', scrollTrigger: trigger })
        gsap.to(card.querySelector('.svc-veil'), { opacity: 0.55, ease: 'none', scrollTrigger: trigger })
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} className="bg-paper pb-24 pt-6 md:pb-40 md:pt-10">
      <div className="container-x">
        {showHeader && (
          <div className="mb-14 flex flex-wrap items-end justify-between gap-6 md:mb-20">
            <h2 className="max-w-2xl font-display text-[clamp(1.75rem,3.2vw,3rem)] font-semibold leading-[0.98] tracking-[-0.045em]">
              End-to-end digital craft.
            </h2>
            <Link to="/services" className="cursor-target text-base underline decoration-brand decoration-2 underline-offset-8">
              View all services
            </Link>
          </div>
        )}

        {services.map((s, i) => (
          <article
            key={s.title}
            className={cn(
              'svc-card sticky mb-[10svh] origin-top overflow-hidden rounded-[2rem] md:rounded-[2.5rem]',
              themes[i % themes.length],
            )}
            style={{ top: `calc(5.5rem + ${i * 0.75}rem)` }}
          >
            <div className="svc-veil pointer-events-none absolute inset-0 z-10 bg-black opacity-0" />
            <div className="grid gap-10 p-7 md:min-h-[30rem] md:grid-cols-12 md:p-12">
              <div className="flex flex-col justify-between gap-10 md:col-span-7">
                <h3 className="font-display text-[clamp(1.6rem,2.5vw,2.6rem)] font-semibold leading-[0.95] tracking-[-0.045em]">
                  {s.title}
                </h3>
                <div>
                  <p className="max-w-lg text-lg opacity-80">{s.desc}</p>
                  <p className="cursor-target mt-8 text-base font-medium">
                    <DecryptedText text={s.tools.join(', ')} animateOn="hover" speed={35} maxIterations={8} />
                  </p>
                </div>
              </div>
              <div className="md:col-span-5">
                <Asset
                  src={s.visual}
                  className="aspect-[4/3] w-full object-contain md:aspect-auto md:h-full"
                />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}




