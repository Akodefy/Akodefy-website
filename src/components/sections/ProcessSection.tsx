import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { process } from '@/content/site'

export default function ProcessSection() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      // The line fills as the steps are read; each step lights up when it reaches the middle of the screen.
      gsap.to('.proc-line', {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: { trigger: '.proc-list', start: 'top 60%', end: 'bottom 60%', scrub: true },
      })
      gsap.utils.toArray<HTMLElement>('.proc-step', root.current).forEach((step) => {
        gsap.fromTo(
          step,
          { opacity: 0.22 },
          { opacity: 1, ease: 'none', scrollTrigger: { trigger: step, start: 'top 75%', end: 'top 45%', scrub: true } },
        )
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} className="bg-forest py-16 text-white md:py-24">
      <div className="container-x grid gap-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <h2 className="font-display text-[clamp(1.75rem,3.2vw,3rem)] font-semibold leading-[0.98] tracking-[-0.045em] md:sticky md:top-32">
            {process.title}
          </h2>
        </div>

        <div className="proc-list relative md:col-span-7">
          <div className="absolute bottom-0 left-0 top-0 w-px bg-white/15">
            <div className="proc-line h-full w-full origin-top scale-y-0 bg-brand" />
          </div>
          {process.steps.map((s) => (
            <div key={s.no} className="proc-step py-12 pl-10 first:pt-0 md:py-16 md:pl-16">
              <p className="font-display text-xl font-medium text-brand">{s.no}</p>
              <h3 className="mt-3 font-display text-[clamp(1.6rem,2.6vw,2.5rem)] font-semibold leading-none tracking-[-0.045em]">
                {s.title}
              </h3>
              <p className="mt-5 max-w-md text-lg text-white/70">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}




