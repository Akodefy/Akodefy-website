import SEOHead from '@/components/common/SEOHead'
import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import SplitHeading from '@/components/common/SplitHeading'
import PageHero from '@/components/common/PageHero'
import CTASection from '@/components/sections/CTASection'
import { useState } from 'react'

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
    heading: 'What we collect',
    body: [
      'When you submit a contact or enquiry form on this website, we collect the name, email address, and any project details you choose to share. We collect only what you provide — nothing more.',
      'We do not run advertising trackers, fingerprinting scripts, or cross-site analytics. The website uses session cookies to maintain basic functionality. We do not use Google Analytics or any behavioural profiling service.',
    ],
  },
  {
    index: '02',
    heading: 'How we use it',
    body: [
      'Information from contact forms is used solely to respond to your enquiry and understand your project needs. We do not add you to mailing lists without a separate, explicit opt-in.',
      'We do not sell, rent, or share your personal data with any third party for marketing purposes. Full stop.',
    ],
  },
  {
    index: '03',
    heading: 'Third-party services',
    body: [
      'This website is built with and powered by several third-party services, each with their own privacy practices:',
    ],
    list: [
      'Firebase (Google) — authentication and database storage for our admin portal and job applications',
      'EmailJS — delivers contact form submissions directly to our inbox without storing them on a third-party server',
      'Cloudinary — hosts media assets (images) for the blog and site content',
      'Netlify — serves the website and handles deployments; Netlify may log request metadata per their own privacy policy',
    ],
  },
  {
    index: '04',
    heading: 'Cookies',
    body: [
      'We use session cookies to support basic site functionality. These expire when you close your browser and contain no personally identifying information.',
      'We do not use persistent tracking cookies, advertising cookies, or any third-party cookie networks. You can disable cookies in your browser settings without breaking the core experience of this website.',
    ],
  },
  {
    index: '05',
    heading: 'Data retention',
    body: [
      'Contact form submissions and job applications are retained for up to 12 months. After that period, or upon your request, records are deleted.',
      'To request deletion of your data, email us directly at hello@akodefy.com with the subject line "Data deletion request." We will confirm and action within 7 working days.',
    ],
  },
  {
    index: '06',
    heading: 'Your rights',
    body: [
      'You have the right to access, correct, or request deletion of any personal data we hold about you. You also have the right to know what data we have, why we have it, and how long we keep it.',
      'Exercise any of these rights by contacting us at hello@akodefy.com. We do not charge for these requests and will respond within 30 days.',
    ],
  },
  {
    index: '07',
    heading: 'Changes to this policy',
    body: [
      'If we change how we handle personal data in any meaningful way, we will update this page and revise the date at the top. We recommend checking back periodically if this is important to you.',
      'Continued use of this website after a change is posted constitutes acceptance of the updated policy.',
    ],
  },
]

export default function PrivacyPage() {
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
      <SEOHead title="Privacy Policy — Akodefy" description="How Akodefy handles your personal data. We use only essential cookies and never sell your data to third parties." canonical="https://www.akodefy.com/privacy" />
      <ProgressBar />
      <PageHero title="Privacy Policy" sub="How we handle your data — plainly explained." />

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
            </div>
          ))}
        </div>
      </div>

      <CTASection />
    </>
  )
}