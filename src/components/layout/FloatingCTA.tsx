import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight } from '@/components/common/icons'

export default function FloatingCTA() {
  const { pathname } = useLocation()
  const [past, setPast] = useState(false)

  useEffect(() => {
    const on = () => setPast(window.scrollY > window.innerHeight * 0.8)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  const visible = past && pathname !== '/contact'

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.96 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-5 right-5 z-40 md:bottom-7 md:right-7"
        >
          <Link
            to="/contact"
            className="cursor-target group flex items-center gap-4 rounded-full bg-forest/85 py-1.5 pl-6 pr-1.5 text-sm font-medium text-white ring-1 ring-white/15 backdrop-blur-xl"
          >
            Start a Project
            <span className="grid size-10 place-items-center rounded-full bg-brand text-forest transition-transform duration-500 group-hover:rotate-45">
              <ArrowUpRight className="size-4" />
            </span>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
