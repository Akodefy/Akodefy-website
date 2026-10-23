import { useEffect, useRef, useState } from 'react'
import { GhostFibers } from '@/components/rb'
import SplitHeading from '@/components/common/SplitHeading'
import ButtonLink from '@/components/common/ButtonLink'
import Asset from '@/components/common/Asset'
import { gsap } from '@/lib/gsap'
import { whenReady } from '@/lib/ready'
import { hero } from '@/content/site'

// True when viewport <768px or the pointer is coarse (touch device).
function useLowPerfDevice() {
  const [low, setLow] = useState(false)
  useEffect(() => {
    const check = () =>
      setLow(window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches)
    check()
    window.addEventListener('resize', check, { passive: true })
    return () => window.removeEventListener('resize', check)
  }, [])
  return low
}

export default function HeroSection() {
  const root = useRef<HTMLElement>(null)
  const lowPerf = useLowPerfDevice()

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
      {/*
        The card is defined against the black page by three things: a hairline edge, a lit top rim,
        and a faint neon halo around it. Inside, an emerald pool sits low in the card and the fibers
        are drawn on top of it in the site's own greens.
      */}
      <div className="relative isolate flex min-h-[calc(100svh-1.5rem)] flex-col overflow-hidden rounded-[2rem] bg-forest text-white shadow-[inset_0_1px_0_rgba(185,255,214,0.14),0_0_90px_-24px_rgba(43,255,136,0.28)] ring-1 ring-white/[0.1] md:min-h-[calc(100svh-2rem)] md:rounded-[2.75rem]">
        {/* Emerald pool, low and centred */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-30 bg-[radial-gradient(85%_65%_at_50%_108%,rgba(43,255,136,0.26),rgba(12,43,28,0.55)_45%,transparent_72%)]"
        />

        {/* Fibers: the canvas is transparent additive light, so it sits directly over the pool */}
        <div className="absolute inset-0 -z-20">
          <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <GhostFibers
              glowColor="#2BFF88"
              /* Low-power mode: fewer threads, layers and no particles → ~50% less GPU work */
              layers={lowPerf ? 2 : 3}
              threads={lowPerf ? 36 : 60}
              dpr={lowPerf ? 1 : undefined}
              particles={lowPerf ? 0 : 0.5}
              sparkle={lowPerf ? 0 : 0.5}
              hoverEffect={lowPerf ? 'none' : 'focus'}
              mouseInteraction={!lowPerf}
              pulseOnClick={!lowPerf}
              /* Shared props */
              twist={1.2}
              fiberStyle="dots"
              depthOfField={0.85}
              intro
              lineColor="#D8FFE9"
              secondaryColor="#0E9F5B"
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
              glow={0.8}
              brightness={1.5}
              vignette={0.3}
              grain={0.06}
              mouseStrength={1}
              lightMode={false}
            />
          </div>
        </div>

        {/* Soft light catching the top rim, behind the nav */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_38%_at_50%_0%,rgba(185,255,214,0.09),transparent_72%)]"
        />

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
            <div className="overflow-hidden rounded-t-[1.5rem] border border-b-0 border-white/20 bg-forest-2/90 shadow-[0_-40px_120px_-40px_rgba(43,255,136,0.45)] backdrop-blur">
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