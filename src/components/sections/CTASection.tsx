import { DotGrid, Magnet } from '@/components/react-bits'
import SplitHeading from '@/components/common/SplitHeading'
import ButtonLink from '@/components/common/ButtonLink'
import { cta } from '@/content/site'

export default function CTASection() {
  return (
    <section className="bg-paper p-3 md:p-4">
      <div className="relative isolate overflow-hidden rounded-[2rem] bg-forest px-6 py-28 text-white md:rounded-[2.75rem] md:py-44">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <DotGrid
            dotSize={4}
            gap={26}
            baseColor="#0F4A34"
            activeColor="#19C46B"
            proximity={140}
            shockRadius={220}
            shockStrength={4}
            returnDuration={1.5}
          />
        </div>
        <div className="container-x flex flex-col items-center text-center">
          <SplitHeading
            text={cta.title}
            className="max-w-4xl font-display text-[clamp(2.9rem,8vw,8.5rem)] font-semibold leading-[0.93] tracking-[-0.05em]"
          />
          <p className="mt-8 max-w-md text-lg text-white/70">{cta.sub}</p>
          <div className="mt-12">
            <Magnet padding={90} magnetStrength={4}>
              <ButtonLink to="/contact">Start a Project</ButtonLink>
            </Magnet>
          </div>
        </div>
      </div>
    </section>
  )
}
