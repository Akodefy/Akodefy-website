import { useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { gsap, ScrollTrigger } from './gsap'

let instance: Lenis | null = null

export function scrollToTop() {
  if (instance) instance.scrollTo(0, { immediate: true })
  else window.scrollTo(0, 0)
}

// Lenis drives the scroll position; GSAP's ticker drives Lenis, so ScrollTrigger stays in sync.
export function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({
      lerp: 0.1,          // slightly more responsive than 0.09 — feels snappier on low-end devices
      wheelMultiplier: 1, // native-feeling scroll speed
      syncTouch: false,   // let native momentum handle touch — significantly faster on mobile
    })
    instance = lenis
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(500, 33) // absorb tab-switch / background spikes gracefully
    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      instance = null
    }
  }, [])
}
