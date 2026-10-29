import { lazy, Suspense, useEffect, useState, type ReactNode } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { TargetCursor } from '@/components/react-bits'
import Loader from '@/components/layout/Loader'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import FloatingCTA from '@/components/layout/FloatingCTA'
import CookieBanner from '@/components/layout/CookieBanner'
// Home is eager — it's the landing page, we want it in the initial bundle.
import Home from '@/pages/Home'
import { projects } from '@/content/site'
import { ScrollTrigger } from '@/lib/gsap'
import { scrollToTop, useSmoothScroll } from '@/lib/lenis'
import { markReady } from '@/lib/ready'

// All other pages are lazy-loaded: they split into separate JS chunks that are
// only fetched when the user navigates to them. This saves ~40–60 kB on first load.
const AboutPage = lazy(() => import('@/pages/AboutPage'))
const ServicesPage = lazy(() => import('@/pages/ServicesPage'))
const PortfolioPage = lazy(() => import('@/pages/PortfolioPage'))
const ContactPage = lazy(() => import('@/pages/ContactPage'))
const PricingPage = lazy(() => import('@/pages/Pricingpage'))
const CareersPage = lazy(() => import('@/pages/CareersPage'))
const BlogPage = lazy(() => import('@/pages/BlogPage'))
const BlogPostPage = lazy(() => import('@/pages/BlogPostPage'))
const AdminPage = lazy(() => import('@/pages/AdminPage'))
const PrivacyPage = lazy(() => import('@/pages/PrivacyPage'))
const TermsPage   = lazy(() => import('@/pages/TermsPage'))
const CookiesPage = lazy(() => import('@/pages/CookiesPage'))

const INTRO_KEY = 'akodefy-intro-seen'
const wipe = [0.76, 0, 0.24, 1] as const

/** Route wrapper: a green panel covers the old page from the bottom and lifts off the new one. */
function Page({ children }: { children: ReactNode }) {
  useEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <main id="main-content">
      {children}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[90] bg-brand"
        style={{ originY: 0 }}
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0, originY: 0, transition: { scaleY: { duration: 0.9, ease: wipe, delay: 0.1 }, originY: { duration: 0 } } }}
        exit={{ scaleY: 1, originY: 1, transition: { scaleY: { duration: 0.8, ease: wipe }, originY: { duration: 0 } } }}
      />
    </main>
  )
}

function Shell() {
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/v1/admin')

  return (
    <>
      {!isAdmin && <Navbar />}
      <AnimatePresence mode="wait" initial={false} onExitComplete={scrollToTop}>
        <Page key={location.pathname}>
          {/* Suspense fallback is invisible — the page-wipe animation covers the transition */}
          <Suspense fallback={null}>
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route
                path="/portfolio"
                element={projects.length ? <PortfolioPage /> : <Navigate to="/" replace />}
              />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/careers" element={<CareersPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              <Route path="/v1/admin" element={<AdminPage />} />
              <Route path="/v1/admin/*" element={<AdminPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms"   element={<TermsPage />} />
              <Route path="/cookies" element={<CookiesPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </Page>
      </AnimatePresence>
      {!isAdmin && <Footer />}
      {!isAdmin && <FloatingCTA />}
      {!isAdmin && <CookieBanner />}
    </>
  )
}

export default function App() {
  const [loading, setLoading] = useState(() => {
    try {
      return !sessionStorage.getItem(INTRO_KEY)
    } catch {
      return true
    }
  })

  useSmoothScroll()

  useEffect(() => {
    if (!loading) markReady()
  }, [loading])

  const finishIntro = () => {
    try {
      sessionStorage.setItem(INTRO_KEY, '1')
    } catch {
      /* storage unavailable */
    }
    setLoading(false)
  }

  return (
    <BrowserRouter>
      <TargetCursor targetSelector=".cursor-target" spinDuration={2} hideDefaultCursor />
      {loading && <Loader onReveal={markReady} onDone={finishIntro} />}
      <Shell />
    </BrowserRouter>
  )
}
