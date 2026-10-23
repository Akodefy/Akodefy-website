import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import Logo from '@/components/common/Logo'
import { nav } from '@/content/site'
import { cn } from '@/lib/utils'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  const mobileLinks = [...nav, { label: 'Contact', to: '/contact' }]

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      {/* Frosted backdrop — invisible at top, slides in on scroll */}
      <div
        aria-hidden
        className={cn(
          'absolute inset-x-0 top-0 h-28 transition-all duration-500 [mask-image:linear-gradient(to_bottom,black_55%,transparent)]',
          scrolled
            ? 'bg-paper/60 backdrop-blur-xl'
            : 'bg-transparent backdrop-blur-none',
        )}
      />
      <div className="container-x relative flex items-center justify-between pt-5">
        {/* Difference blend keeps the wordmark legible over both the dark hero and light pages */}
        <Logo className="pointer-events-auto" />

        <nav
          aria-label="Primary"
          className={cn(
            'pointer-events-auto hidden items-center gap-1 rounded-full p-1.5 pl-2 ring-1 ring-white/10 backdrop-blur-xl transition-colors duration-500 md:flex',
            scrolled ? 'bg-forest/90' : 'bg-forest/55',
          )}
        >
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className="cursor-target relative px-4 py-2 text-sm text-white/75 transition-colors hover:text-white"
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full bg-white/12"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className={cn('relative', isActive && 'text-white')}>{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
          <Link
            to="/contact"
            className="cursor-target ml-1 rounded-full bg-brand px-5 py-2 text-sm font-medium text-forest transition-transform hover:scale-[1.03]"
          >
            Let’s Talk
          </Link>
        </nav>

        <Sheet>
          <SheetTrigger asChild>
            <button
              type="button"
              className="pointer-events-auto rounded-full bg-forest/80 px-5 py-2.5 text-sm font-medium text-white ring-1 ring-white/10 backdrop-blur-xl md:hidden"
            >
              Menu
            </button>
          </SheetTrigger>
          <SheetContent
            side="right"
            aria-describedby={undefined}
            className="w-full border-0 bg-forest p-8 text-white sm:max-w-full [&>button]:text-white"
          >
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <div className="flex h-full flex-col justify-center gap-2">
              {mobileLinks.map((item) => (
                <SheetClose asChild key={item.to}>
                  <Link
                    to={item.to}
                    className="font-display text-[clamp(2.75rem,12vw,5rem)] font-semibold leading-[1.05] tracking-[-0.04em] transition-colors hover:text-brand"
                  >
                    {item.label}
                  </Link>
                </SheetClose>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
