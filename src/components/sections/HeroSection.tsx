import { useEffect, useRef } from 'react'
import { GhostFibers } from '@/components/react-bits'
import SplitHeading from '@/components/common/SplitHeading'
import ButtonLink from '@/components/common/ButtonLink'
import Asset from '@/components/common/Asset'
import { gsap } from '@/lib/gsap'
import { whenReady } from '@/lib/ready'
import { hero } from '@/content/site'

export default function HeroSection() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    let cancelled = false
    const ctx = gsap.context(() => {
      // Scroll: the product frame tilts upright as you leave the hero, the copy lifts away.
      gsap.fromTo(
        '.hero-frame',
        { rotateX: 14, scale: 0.92, transformPerspective: 1600, transformOrigin: '50% 100%' },
        {
          rotateX: 0,
          scale: 1,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom 40%', scrub: true },
        },
      )
      gsap.to('.hero-copy', {
        yPercent: -10,
        opacity: 0.1,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: '70% top', scrub: true },
      })
    }, root)

    // Entrance: runs once, after the loader has lifted.
    whenReady().then(() => {
      if (cancelled) return
      ctx.add(() => {
        gsap.fromTo(
          '.hero-in',
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.12, delay: 0.7 },
        )
        gsap.fromTo(
          '.hero-frame-wrap',
          { opacity: 0, yPercent: 18 },
          { opacity: 1, yPercent: 0, duration: 1.5, ease: 'power4.out', delay: 0.5 },
        )
      })
    })

    return () => {
      cancelled = true
      ctx.revert()
    }
  }, [])

  return (
    <section ref={root} className="p-3 md:p-4">
      <div className="relative isolate flex min-h-[calc(100svh-1.5rem)] flex-col overflow-hidden rounded-[2rem] bg-forest text-white md:min-h-[calc(100svh-2rem)] md:rounded-[2.75rem]">
        <div className="absolute inset-0 -z-10">
          <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <GhostFibers
              glowColor="#2cd89f"
              layers={3}
              twist={1.2}
              threads={72}
              fiberStyle="dots"
              depthOfField={0.85}
              hoverEffect="focus"
              intro
              mouseInteraction
              lineColor="#dfd1fc"
              secondaryColor="#10b981"
              gradient="depth"
              waves={1}
              volume={0.7}
              spread={1}
              scale={1}
              rotation={18}
              perspective={0.65}
              density={1}
              thickness={1}
              tips={0}
              foldGlow={1}
              speed={0.5}
              flow={0.4}
              rollSpeed={0.15}
              focusDepth={0}
              particles={0.5}
              sparkle={0.5}
              glow={0.8}
              brightness={1}
              vignette={0.3}
              grain={0.06}
              mouseStrength={1}
              pulseOnClick
              lightMode={false}
            />
          </div>
        </div>
        {/* Light touch only: keeps the nav and the lower edge readable without hiding the fibers */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-forest/30 via-transparent to-forest/80" />

        {/* Copy and frame ignore the pointer so the fibers can react to it; the buttons opt back in */}
        <div className="hero-copy container-x pointer-events-none flex flex-col items-center pt-36 text-center md:pt-44">
          <SplitHeading
            as="h1"
            mode="load"
            delay={0.3}
            text={hero.headline}
            className="max-w-5xl font-display text-[clamp(2.9rem,7.6vw,7.75rem)] font-semibold leading-[0.94] tracking-[-0.05em]"
          />
          <p className="hero-in mt-8 max-w-xl text-lg text-white/75 opacity-0">{hero.sub}</p>
          <div className="hero-in pointer-events-auto mt-10 flex flex-wrap justify-center gap-3 opacity-0">
            <ButtonLink to="/contact">Start a Project</ButtonLink>
            <ButtonLink to={hero.secondary.to} variant="ghost">
              {hero.secondary.label}
            </ButtonLink>
          </div>
        </div>

        <div className="hero-frame-wrap pointer-events-none relative -mb-24 mt-auto w-full px-4 pt-16 opacity-0 md:px-8">
          <div className="hero-frame mx-auto w-full max-w-[72rem]">
            <div className="overflow-hidden rounded-t-[1.5rem] border border-b-0 border-white/15 bg-forest-2/90 shadow-[0_-40px_120px_-40px_rgba(25,196,107,0.45)] backdrop-blur">
              <div className="flex gap-2 border-b border-white/10 px-5 py-3.5">
                <span className="size-2.5 rounded-full bg-white/20" />
                <span className="size-2.5 rounded-full bg-white/20" />
                <span className="size-2.5 rounded-full bg-white/20" />
              </div>
              <Asset src="/assets/hero-frame.webp" className="aspect-[16/9] w-full object-cover object-top" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}