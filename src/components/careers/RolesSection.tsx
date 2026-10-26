import { useState, useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { careers, type JobRole } from '@/content/site'
import { cn } from '@/lib/utils'

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

export default function RolesSection({
  onApply,
  roles,
}: {
  onApply: (role: JobRole | null) => void
  roles?: JobRole[]
}) {
  const [active, setActive] = useState('All')
  const listRef = useRef<HTMLDivElement>(null)
  const root = useRef<HTMLElement>(null)

  const activeRoles = roles ?? []
  const depts = activeRoles.length > 0 ? ['All', ...Array.from(new Set(activeRoles.map((r) => r.department)))] : []

  const filtered =
    active === 'All' ? activeRoles : activeRoles.filter((r) => r.department === active)

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
    <section ref={root} id="open-roles" className="overflow-hidden bg-paper py-12 md:py-20">
      <div className="container-x">
        {/* Header + filter */}
        <div className="cr-header mb-12 flex flex-wrap items-end justify-between gap-8 md:mb-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand">
              Open positions
            </p>
            <h2 className="mt-4 font-display text-[clamp(1.9rem,3.8vw,4rem)] font-semibold leading-[0.98] tracking-[-0.045em]">
              Find your role.
            </h2>
          </div>

          {/* Department filter tabs */}
          {depts.length > 1 && (
            <div className="flex flex-wrap gap-2">
              {depts.map((d) => (
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
          )}
        </div>

        {/* Role list OR Empty state */}
        {activeRoles.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-forest/40 p-8 text-center md:p-14">
            <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-brand/10 text-brand ring-1 ring-brand/20">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-6">
                <rect width="20" height="14" x="2" y="7" rx="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
            </div>
            <h3 className="mt-4 font-display text-xl font-semibold text-white">
              No open roles at the moment
            </h3>
            <p className="mx-auto mt-2 max-w-lg text-sm text-white/60 leading-relaxed">
              We don't have any specific openings right now, but we are always looking for exceptional engineers, designers, and strategists. Feel free to submit a speculative application below.
            </p>
            <div className="mt-6">
              <button
                type="button"
                onClick={() => onApply(null)}
                className="cursor-target inline-flex h-11 items-center justify-center gap-2 rounded-full bg-brand px-6 text-sm font-semibold text-forest transition hover:bg-white"
              >
                Send a speculative application
              </button>
            </div>
          </div>
        ) : (
          <div ref={listRef}>
            {filtered.map((role) => (
              <RoleRow key={role.id} role={role} onApply={onApply} />
            ))}
            <div className="border-t border-border" />
          </div>
        )}

        {/* Speculative application note when roles exist */}
        {activeRoles.length > 0 && (
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
        )}
      </div>
    </section>
  )
}
