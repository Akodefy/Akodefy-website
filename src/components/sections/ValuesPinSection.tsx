import { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
import { about } from '@/content/site'
import { cn } from '@/lib/utils'

/* Line art, one per statement. Every stroke is `pathLength={1}` so GSAP can draw and un-draw it. */
const draw = {
  className: 'd',
  fill: 'none',
  stroke: '#2BFF88',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  vectorEffect: 'non-scaling-stroke',
  pathLength: 1,
  strokeDasharray: 1,
} as const

type ArtProps = { hidden?: boolean }
const artClass = (hidden?: boolean) => cn('val-art absolute inset-0 size-full', hidden && 'invisible')

function TargetArt({ hidden }: ArtProps) {
  return (
    <svg viewBox="0 0 400 400" className={artClass(hidden)} aria-hidden>
      <circle {...draw} cx="200" cy="200" r="190" />
      <circle {...draw} cx="200" cy="200" r="140" />
      <circle {...draw} cx="200" cy="200" r="90" />
      <circle {...draw} cx="200" cy="200" r="40" />
      <path {...draw} d="M200 4V44M200 356V396M4 200H44M356 200H396" />
      <circle cx="200" cy="200" r="7" fill="#2BFF88" />
    </svg>
  )
}

function EyeArt({ hidden }: ArtProps) {
  return (
    <svg viewBox="0 0 400 400" className={artClass(hidden)} aria-hidden>
      <path {...draw} d="M10 220C80 100 320 100 390 220C320 340 80 340 10 220Z" />
      <circle {...draw} cx="200" cy="220" r="70" />
      <circle {...draw} cx="200" cy="220" r="38" />
      <path {...draw} d="M200 40V78M118 64L132 98M282 64L268 98M52 118L82 140M348 118L318 140" />
      <circle cx="200" cy="220" r="14" fill="#2BFF88" />
    </svg>
  )
}

function GemArt({ hidden }: ArtProps) {
  return (
    <svg viewBox="0 0 400 400" className={artClass(hidden)} aria-hidden>
      <path {...draw} d="M200 14L386 200L200 386L14 200Z" />
      <path {...draw} d="M200 78L322 200L200 322L78 200Z" />
      <path {...draw} d="M200 140L260 200L200 260L140 200Z" />
      <path {...draw} d="M200 14V386M14 200H386" />
      <circle cx="200" cy="200" r="7" fill="#2BFF88" />
    </svg>
  )
}

const ARTS = [TargetArt, EyeArt, GemArt]

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v))
const smooth = (t: number) => t * t * (3 - 2 * t)
/** How "present" statement i is when the scroll position is x (x = 0 is the first statement, x = n-1 the last). */
const presence = (x: number, i: number) => smooth(clamp((0.45 - Math.abs(x - i)) / 0.3))

/**
 * Mission, Vision and Values on one pinned screen. Scroll hands the stage from one to the next:
 * the line art un-draws and the next one draws itself, an outlined word slides in behind,
 * and the statement lights up word by word.
 *
 * No stacked tweens: on every frame the scroll position is turned directly into each element's
 * state, so the section can be scrolled forwards and backwards and can never get stuck.
 */
export default function ValuesPinSection() {
  const root = useRef<HTMLElement>(null)
  const values = about.values

  useGSAP(
    () => {
      const el = root.current
      if (!el) return
      const items = gsap.utils.toArray<HTMLElement>('.val-item', el)
      const arts = gsap.utils.toArray<SVGElement>('.val-art', el)
      const ghosts = gsap.utils.toArray<HTMLElement>('.val-ghost', el)
      const navs = gsap.utils.toArray<HTMLElement>('.val-nav', el)
      const line = el.querySelector<HTMLElement>('.val-line')
      const n = items.length
      if (!n) return

      const wordEls = items.map((it) => Array.from(it.querySelectorAll<HTMLElement>('.val-w')))
      const strokeEls = arts.map((a) => Array.from(a.querySelectorAll<SVGElement>('.d')))

      const render = (x: number, intro: number) => {
        items.forEach((item, i) => {
          let p = presence(x, i)
          if (i === 0) p *= intro
          const dir = x > i ? -1 : 1 // leaving upwards, or arriving from below
          const shown = p > 0.002

          // Statement: words light up one after another
          item.style.visibility = shown ? 'visible' : 'hidden'
          const words = wordEls[i]
          words.forEach((w, j) => {
            const wp = clamp((p - (j / words.length) * 0.55) / 0.45)
            w.style.opacity = String((0.12 + 0.88 * wp) * clamp(p * 4))
            w.style.transform = `translateY(${(1 - wp) * 16 * dir}px)`
          })

          // Line art: strokes draw on (or un-draw), the filled dot follows the container
          const art = arts[i]
          art.style.visibility = shown ? 'visible' : 'hidden'
          art.style.opacity = String(clamp(p * 3))
          const strokes = strokeEls[i]
          strokes.forEach((s, k) => {
            const dp = clamp((p - (k / strokes.length) * 0.5) / 0.5)
            s.style.strokeDashoffset = String((1 - dp) * dir * -1 * -1)
          })

          // Outlined word behind everything
          const ghost = ghosts[i]
          ghost.style.visibility = shown ? 'visible' : 'hidden'
          ghost.style.opacity = String(p)
          ghost.style.transform = `translateY(${(1 - p) * 14 * dir}%)`

          // Side list
          navs[i].style.opacity = String(0.3 + 0.7 * p)
        })
        if (line) line.style.scale = `1 ${n > 1 ? x / (n - 1) : 1}`
      }

      // Scroll position drives a target; a short ease makes the hand-over feel smooth.
      let target = 0
      let current = 0
      const intro = { v: 0 }
      let last = ''

      const tick = (_t: number, dt: number) => {
        current += (target - current) * (1 - Math.exp(-dt / 110))
        const key = `${current.toFixed(4)}|${intro.v.toFixed(3)}`
        if (key === last) return
        last = key
        render(current, intro.v)
      }
      render(0, 0)
      gsap.ticker.add(tick)

      // First statement draws in once as the section arrives.
      gsap.to(intro, {
        v: 1,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 70%', once: true },
      })

      ScrollTrigger.create({
        trigger: el,
        start: 'top top',
        end: `+=${n * 100}%`,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          // A short hold at the start and the end, travel in between.
          target = clamp((self.progress - 0.08) / 0.84) * (n - 1)
        },
      })

      return () => gsap.ticker.remove(tick)
    },
    { scope: root },
  )

  return (
    <section ref={root} className="relative h-svh overflow-hidden bg-forest text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_80%_20%,rgba(43,255,136,0.16),transparent_70%)]"
      />

      {/* Outlined word, one per statement, sitting low behind everything */}
      {values.map((v, idx) => (
        <span
          key={v.title}
          aria-hidden
          className={cn(
            'val-ghost pointer-events-none absolute bottom-[-0.14em] left-[-0.03em] select-none whitespace-nowrap font-display text-[clamp(9rem,26vw,28rem)] font-semibold leading-none tracking-[-0.06em] text-transparent [-webkit-text-stroke:1.5px_rgba(234,243,236,0.1)]',
            idx > 0 && 'invisible',
          )}
        >
          {v.title}
        </span>
      ))}

      {/* Line art, drawn on at the right and fading behind the text */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-8%] top-1/2 size-[min(78svh,90vw,50rem)] -translate-y-1/2 opacity-60 md:right-[-2%]"
      >
        {values.map((v, idx) => {
          const Art = ARTS[idx % ARTS.length]
          return <Art key={v.title} hidden={idx > 0} />
        })}
      </div>

      <div className="container-x relative z-10 grid h-full items-center gap-10 md:grid-cols-12">
        <div className="relative flex gap-8 md:col-span-3 md:flex-col md:gap-5 md:pl-7">
          <div className="absolute bottom-0 left-0 top-0 hidden w-px bg-white/15 md:block">
            <div className="val-line h-full w-full origin-top scale-y-0 bg-brand" />
          </div>
          {values.map((v, idx) => (
            <p
              key={v.title}
              className={cn('val-nav font-display text-2xl font-medium tracking-[-0.03em] md:text-4xl', idx > 0 && 'opacity-30')}
            >
              {v.title}
            </p>
          ))}
        </div>

        <div className="relative h-[55svh] md:col-span-9">
          {values.map((v, idx) => (
            <div key={v.title} className={cn('val-item absolute inset-0 flex items-center', idx > 0 && 'invisible')}>
              <p className="max-w-[56rem] font-display text-[clamp(1.6rem,3.2vw,3.25rem)] font-medium leading-[1.05] tracking-[-0.04em]">
                {v.text.split(' ').map((w, i) => (
                  <span key={i} className={cn('val-w mr-[0.22em] inline-block', idx > 0 && 'opacity-[0.12]')}>
                    {w}
                  </span>
                ))}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
