import { useEffect, useState, type ReactNode } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { TargetCursor } from '@/components/react-bits'
import Loader from '@/components/layout/Loader'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import FloatingCTA from '@/components/layout/FloatingCTA'
import Home from '@/pages/Home'
import AboutPage from '@/pages/AboutPage'
import ServicesPage from '@/pages/ServicesPage'
import PortfolioPage from '@/pages/PortfolioPage'
import ContactPage from '@/pages/ContactPage'
import PricingPage from '@/pages/Pricingpage'
import CareersPage from '@/pages/CareersPage'
import { projects } from '@/content/site'
import { ScrollTrigger } from '@/lib/gsap'
import { scrollToTop, useSmoothScroll } from '@/lib/lenis'
import { markReady } from '@/lib/ready'

const INTRO_KEY = 'akodefy-intro-seen'
const wipe = [0.76, 0, 0.24, 1] as const

/** Route wrapper: a green panel covers the old page from the bottom and lifts off the new one. */
function Page({ children }: { children: ReactNode }) {
  useEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <main>
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
  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait" initial={false} onExitComplete={scrollToTop}>
        <Page key={location.pathname}>
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
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Page>
      </AnimatePresence>
      <Footer />
      <FloatingCTA />
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
      /* storage unavailable: intro simply plays again next visit */
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
