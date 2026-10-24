import { useState, useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { careers, type JobRole } from '@/content/site'
import { cn } from '@/lib/utils'

const DEPTS = ['All', ...Array.from(new Set(careers.openRoles.map((r) => r.department)))]

function RoleRow({
  role,
  onApply,
}: {
  role: JobRole
  onApply: (role: JobRole) => void
}) {
  return (
    <div className="cr-row group relative grid items-center gap-6 border-t border-border py-7 md:grid-cols-[1fr_auto] md:py-8">
      {/* Hover accent bar */}
      <span
        aria-hidden
        className="absolute left-0 top-0 h-0 w-0.5 bg-brand transition-all duration-500 group-hover:h-full"
      />

      <div className="pl-4 md:pl-6">
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="font-display text-2xl font-semibold tracking-[-0.03em] transition-colors group-hover:text-brand md:text-[clamp(1.4rem,2.2vw,2rem)]">
            {role.title}
          </h3>
          <span className="rounded-full bg-forest px-3 py-1 text-xs font-medium text-white/60 ring-1 ring-white/12">
            {role.type}
          </span>
        </div>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
          <span>{role.department}</span>
          <span aria-hidden className="text-white/20">·</span>
          <span>{role.location}</span>
          <span aria-hidden className="text-white/20">·</span>
          <span>{role.experience}</span>
        </div>
        {/* Description visible inline on desktop — no accordion */}
        <p className="mt-4 hidden max-w-2xl text-[0.95rem] leading-relaxed text-white/55 md:block">
          {role.description}
        </p>
      </div>

      <button
        type="button"
        onClick={() => onApply(role)}
        className="cursor-target ml-4 inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-transparent px-6 text-sm font-medium ring-1 ring-white/20 transition-all duration-300 hover:bg-brand hover:text-forest hover:ring-brand md:ml-0"
      >
        Apply
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-3.5">
          <path d="M3 8h10M9 4l4 4-4 4" />
        </svg>
      </button>
    </div>
  )
}

export default function RolesSection({ onApply }: { onApply: (role: JobRole | null) => void }) {
  const [active, setActive] = useState('All')
  const listRef = useRef<HTMLDivElement>(null)
  const root = useRef<HTMLElement>(null)

  const filtered =
    active === 'All' ? careers.openRoles : careers.openRoles.filter((r) => r.department === active)

  const handleFilter = (dept: string) => {
    const el = listRef.current
    if (!el) { setActive(dept); return }
    gsap.to(el, {
      opacity: 0,
      y: 10,
      duration: 0.2,
      ease: 'power2.in',
      onComplete: () => {
        setActive(dept)
        gsap.to(el, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' })
      },
    })
  }

  useGSAP(
    () => {
      gsap.from('.cr-header', {
        opacity: 0,
        y: 28,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.cr-header', start: 'top 88%', once: true },
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} id="open-roles" className="overflow-hidden bg-paper py-16 md:py-28">
      <div className="container-x">
        {/* Header + filter */}
        <div className="cr-header mb-12 flex flex-wrap items-end justify-between gap-8 md:mb-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand">
              Open positions
            </p>
            <h2 className="mt-4 font-display text-[clamp(2.4rem,5.5vw,5rem)] font-semibold leading-[0.98] tracking-[-0.045em]">
              Find your role.
            </h2>
          </div>

          {/* Department filter tabs */}
          <div className="flex flex-wrap gap-2">
            {DEPTS.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => handleFilter(d)}
                className={cn(
                  'cursor-target rounded-full px-5 py-2 text-sm font-medium transition-all duration-300',
                  active === d
                    ? 'bg-brand text-forest'
                    : 'bg-forest text-white/60 ring-1 ring-white/15 hover:text-white',
                )}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Role list */}
        <div ref={listRef}>
          {filtered.map((role) => (
            <RoleRow key={role.id} role={role} onApply={onApply} />
          ))}
          <div className="border-t border-border" />
        </div>

        {/* Speculative application */}
        <p className="mt-10 text-muted-foreground">
          {careers.openToAll.title}{' '}
          <button
            type="button"
            onClick={() => onApply(null)}
            className="cursor-target underline decoration-brand decoration-2 underline-offset-4 transition-colors hover:text-brand"
          >
            Send a speculative application.
          </button>
        </p>
      </div>
    </section>
  )
}
