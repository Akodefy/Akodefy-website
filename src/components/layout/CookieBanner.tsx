import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from '@/lib/gsap'

const STORAGE_KEY = 'akodefy-cookie-consent'
type Consent = 'accepted' | 'rejected' | null

export default function CookieBanner() {
  const [consent, setConsent] = useState<Consent>(() => {
    try { return (localStorage.getItem(STORAGE_KEY) as Consent) ?? null }
    catch { return null }
  })
  const bannerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Already decided — never show
    if (consent !== null) return

    const el = bannerRef.current
    if (!el) return

    // Start hidden below the fold, then slide up after loader finishes
    gsap.set(el, { y: '100%' })

    const timer = setTimeout(() => {
      gsap.to(el, {
        y: '0%',
        duration: 0.75,
        ease: 'power4.out',
        clearProps: 'transform',
      })
    }, 2400)

    return () => clearTimeout(timer)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])   // run once on mount only

  const dismiss = (value: 'accepted' | 'rejected') => {
    try { localStorage.setItem(STORAGE_KEY, value) }
    catch { /* storage blocked */ }

    gsap.to(bannerRef.current, {
      y: '100%',
      duration: 0.45,
      ease: 'power3.in',
      onComplete: () => setConsent(value),
    })
  }

  // Already consented — unmount entirely
  if (consent !== null) return null

  return (
    <div
      ref={bannerRef}
      role="region"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-[80] will-change-transform"
    >
      {/* Top accent line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-brand/40 to-transparent" />

      <div className="bg-[#0c100e]/95 backdrop-blur-xl">
        <div className="container-x flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-10 md:py-6">
          {/* Copy */}
          <div className="min-w-0">
            <p className="text-sm font-medium leading-relaxed text-white/90">
              We use only essential session cookies — no tracking, no advertising.{' '}
              <Link
                to="/cookies"
                className="text-brand underline underline-offset-2 transition-opacity hover:opacity-70"
              >
                Cookie policy
              </Link>
            </p>
            <p className="mt-0.5 text-xs leading-relaxed text-white/40">
              Rejecting keeps the site fully functional — nothing breaks.
            </p>
          </div>

          {/* Actions */}
          <div className="flex shrink-0 items-center gap-3">
            <button
              type="button"
              onClick={() => dismiss('rejected')}
              className="cursor-target rounded-full border border-white/15 px-5 py-2 text-sm font-medium text-white/60 transition-colors hover:border-white/30 hover:text-white"
            >
              Reject
            </button>
            <button
              type="button"
              onClick={() => dismiss('accepted')}
              className="cursor-target rounded-full bg-brand px-6 py-2 text-sm font-semibold text-forest transition-opacity hover:opacity-90"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}