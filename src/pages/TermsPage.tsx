import SEOHead from '@/components/common/SEOHead'
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
    heading: 'Using this website',
    body: [
      'This website is provided for informational purposes. By accessing it, you agree to these terms. If you disagree with any part, please stop using the site.',
      'You must be at least 18 years old to submit an enquiry or job application through this website. By doing so, you confirm you meet this requirement.',
    ],
  },
  {
    index: '02',
    heading: 'Our services',
    body: [
      'Content on this website describes the services Akodefy offers. It is not a binding offer or contract. Any engagement for services is subject to a separate written agreement between you and Akodefy.',
      'Pricing, timelines, and deliverables shown on this site are indicative guides only. Final scope and cost are agreed in writing before any work begins.',
    ],
  },
  {
    index: '03',
    heading: 'Intellectual property',
    body: [
      'All content on this website — including text, design, code, graphics, and brand assets — is owned by or licensed to Akodefy. All rights are reserved.',
      'You may not reproduce, distribute, or create derivative works from any part of this website without our prior written consent. Linking to our site is permitted without prior approval.',
    ],
  },
  {
    index: '04',
    heading: 'Accuracy of information',
    body: [
      'We make reasonable efforts to keep the information on this website current and accurate. However, we make no warranties — express or implied — about the completeness, accuracy, or reliability of any content here.',
      'Nothing on this website constitutes legal, financial, or professional advice. For specific advice, engage a qualified professional.',
    ],
  },
  {
    index: '05',
    heading: 'Third-party links',
    body: [
      'This website may contain links to external websites operated by third parties. These links are provided for convenience only. We have no control over the content of those sites and accept no responsibility for them.',
      'Inclusion of a link does not imply endorsement of the linked site or its operators.',
    ],
  },
  {
    index: '06',
    heading: 'Limitation of liability',
    body: [
      'This website is provided on an as-is basis. To the fullest extent permitted by applicable law, Akodefy excludes all warranties and shall not be liable for any direct, indirect, or consequential loss arising from your use of this website.',
      'This does not affect any statutory rights you may have as a consumer under applicable Indian law.',
    ],
  },
  {
    index: '07',
    heading: 'Governing law',
    body: [
      'These terms are governed by the laws of India. Any disputes relating to these terms or your use of this website shall be subject to the exclusive jurisdiction of the courts of Tamil Nadu, India.',
    ],
  },
  {
    index: '08',
    heading: 'Contact',
    body: [
      'Questions about these terms? Write to us at hello@akodefy.com. We will respond within 10 working days.',
    ],
  },
]

export default function TermsPage() {
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
      <SEOHead title="Terms of Use — Akodefy" description="Terms governing your use of the Akodefy website. Governed by Indian law, courts of Tamil Nadu." canonical="https://www.akodefy.com/terms" />
      <ProgressBar />
      <PageHero title="Terms of Use" sub="The ground rules for using this website." />

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
            </div>
          ))}
        </div>
      </div>

      <CTASection />
    </>
  )
}