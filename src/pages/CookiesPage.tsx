import { useEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap'
import SplitHeading from '@/components/common/SplitHeading'
import PageHero from '@/components/common/PageHero'
import CTASection from '@/components/sections/CTASection'

function ProgressBar() {
  const [pct, setPct] = useState(0)
  useEffect(() => {
    const update = () => {
      const el = document.documentElement
      const total = el.scrollHeight - el.clientHeight
      setPct(total > 0 ? (el.scrollTop / total) * 100 : 0)
    }
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])
  return (
    <div aria-hidden className="fixed left-0 top-0 z-[100] h-[2px] origin-left bg-brand" style={{ width: `${pct}%` }} />
  )
}

const sections = [
  {
    index: '01',
    heading: 'What cookies are',
    body: [
      'Cookies are small text files that a website stores in your browser when you visit. They are widely used to make websites work efficiently and to give owners basic information about how their site is being used.',
      'We take a minimal approach to cookies. This site uses no advertising cookies, no cross-site trackers, and no behavioural profiling of any kind.',
    ],
  },
  {
    index: '02',
    heading: 'Cookies we use',
    body: [
      'This website uses one category of cookie: session cookies. These exist only while your browser is open and are deleted automatically when you close it. They contain no personally identifying information and are used only to support basic browsing functionality.',
    ],
    list: [
      'Session cookie — keeps your browsing state during a single visit; expires on browser close',
      'No persistent cookies are set by this website directly',
      'No advertising, retargeting, or analytics cookies are used',
    ],
  },
  {
    index: '03',
    heading: 'Third-party cookies',
    body: [
      'Some third-party services we use may set their own cookies. Firebase (Google) may set a session token if you interact with authenticated features such as the job application form. These are functional and contain no personal data beyond a temporary session ID.',
      'We do not use Google Analytics, Facebook Pixel, or any other third-party analytics or advertising service that would set persistent tracking cookies.',
    ],
  },
  {
    index: '04',
    heading: 'Managing cookies',
    body: [
      'You can control and delete cookies through your browser settings. Below is how to access cookie controls in the most common browsers:',
    ],
    list: [
      'Chrome — Settings → Privacy and security → Cookies and other site data',
      'Firefox — Settings → Privacy & Security → Cookies and Site Data',
      'Safari — Preferences → Privacy → Manage Website Data',
      'Edge — Settings → Cookies and site permissions → Cookies and site data',
    ],
    bodyAfter: [
      'Disabling cookies will not break the core experience of this website. All content and contact functionality remain accessible without cookies.',
    ],
  },
  {
    index: '05',
    heading: 'Updates',
    body: [
      'If we introduce new cookies or change how existing ones work, we will update this page and revise the date below. We will only ever add cookies that are strictly necessary for functionality — not for tracking or advertising.',
    ],
  },
]

export default function CookiesPage() {
  const bodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      bodyRef.current?.querySelectorAll<HTMLElement>('.lp-block').forEach((el) => {
        gsap.from(el, {
          y: 20,
          opacity: 0,
          duration: 0.65,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        })
      })
    }, bodyRef)
    return () => ctx.revert()
  }, [])

  return (
    <>
      <ProgressBar />
      <PageHero title="Cookie Policy" sub="A minimal cookie setup — here is exactly what we use and why." />

      <div ref={bodyRef} className="bg-paper">
        <div className="mx-auto max-w-4xl px-5 pb-28 pt-2 md:px-10 lg:px-8 xl:px-0">
          <p className="lp-block mb-14 text-right text-sm text-muted-foreground/60">
            Last updated: 1 January 2025
          </p>

          {sections.map((s) => (
            <div key={s.index} className="lp-block border-b border-border pb-16 mb-16 last:border-0 last:mb-0">
              <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.2em] text-brand">
                {s.index}
              </span>
              <SplitHeading
                as="h2"
                mode="scroll"
                text={s.heading}
                className="mb-8 font-display text-[clamp(1.7rem,3vw,2.5rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-foreground"
              />
              {s.body.map((p, i) => (
                <p key={i} className="my-5 text-[1.07rem] leading-[1.9] text-muted-foreground">
                  {p}
                </p>
              ))}
              {s.list && (
                <ul className="my-6 space-y-4">
                  {s.list.map((item, i) => (
                    <li key={i} className="flex gap-3 text-[1.05rem] leading-[1.8] text-muted-foreground">
                      <span className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
              {s.bodyAfter?.map((p, i) => (
                <p key={i} className="my-5 text-[1.07rem] leading-[1.9] text-muted-foreground">
                  {p}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>

      <CTASection />
    </>
  )
}