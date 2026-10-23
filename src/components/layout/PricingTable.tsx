import { Fragment, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap, useGSAP } from '@/lib/gsap'
import { pricing } from '@/content/site'
import { cn } from '@/lib/utils'

function Tick({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="m5.5 12.5 4.2 4.2 8.8-9.4" />
    </svg>
  )
}

/** Table cell: a tick, a dash, or plain text. */
function Mark({ value }: { value: boolean | string }) {
  if (typeof value === 'string') return <span className="text-[0.95rem] text-white/85">{value}</span>
  if (value) {
    return (
      <span role="img" aria-label="Included" className="inline-grid size-6 place-items-center rounded-full bg-brand text-forest">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" className="size-3.5" aria-hidden>
          <path className="pt-tick" pathLength={1} strokeDasharray={1} d="m5.5 12.5 4.2 4.2 8.8-9.4" />
        </svg>
      </span>
    )
  }
  return (
    <span role="img" aria-label="Not included" className="inline-grid size-6 place-items-center rounded-full bg-white/10 text-white/40">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" className="size-3.5" aria-hidden>
        <path d="M7 12h10" />
      </svg>
    </span>
  )
}

/**
 * Plan columns on top, comparison table underneath, one bordered block.
 * The middle plan is lifted by a lighter column and a neon top edge (no badge).
 */
export default function PricingTable() {
  const root = useRef<HTMLElement>(null)
  const { info, plans, sections } = pricing

  useGSAP(
    () => {
      gsap.from('.pl-col', {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.pl-grid', start: 'top 85%', once: true },
      })

      gsap.utils.toArray<HTMLElement>('.pt-row', root.current).forEach((row) => {
        const st = { trigger: row, start: 'top 94%', once: true }
        gsap.from(row, { opacity: 0, y: 14, duration: 0.6, ease: 'power2.out', scrollTrigger: st })
        const ticks = row.querySelectorAll('.pt-tick')
        if (ticks.length) {
          gsap.from(ticks, { strokeDashoffset: 1, duration: 0.55, delay: 0.2, stagger: 0.08, ease: 'power2.out', scrollTrigger: st })
        }
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} className="bg-paper pb-24 md:pb-40">
      <div className="container-x">
        <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-forest">
          {/* Plan columns */}
          <div className="pl-grid grid md:grid-cols-4">
            <div className="pl-col flex flex-col gap-6 p-8">
              <p className="text-sm text-white/50">{info.title}</p>
              <ul className="space-y-4">
                {info.points.map((p) => (
                  <li key={p} className="flex gap-3 text-lg leading-snug">
                    <span aria-hidden className="mt-2.5 size-2 shrink-0 rounded-full bg-brand" />
                    {p}
                  </li>
                ))}
              </ul>
              <p className="mt-auto pt-6 text-sm text-white/50">{info.note}</p>
            </div>

            {plans.map((plan) => (
              <div
                key={plan.name}
                className={cn(
                  'pl-col flex flex-col border-t border-white/10 p-8 md:border-l md:border-t-0',
                  plan.featured && 'bg-white/[0.04] shadow-[inset_0_2px_0_0_#2BFF88]',
                )}
              >
                <h3 className="font-display text-2xl font-semibold tracking-[-0.03em]">{plan.name}</h3>
                <p className="mt-3 min-h-12 text-white/60">{plan.blurb}</p>
                <p className="mt-8 flex flex-wrap items-baseline gap-x-3">
                  <span className="font-display text-4xl font-semibold tracking-[-0.04em]">{plan.price}</span>
                  <span className="text-sm text-white/50">{plan.unit}</span>
                </p>
                <ul className="mt-8 flex-1 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex gap-3 text-[0.95rem] text-white/85">
                      <Tick className="mt-0.5 size-4 shrink-0 text-brand" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to={plan.cta.to}
                  className={cn(
                    'cursor-target mt-10 inline-flex h-12 items-center justify-center rounded-full px-6 font-medium transition-colors',
                    plan.featured
                      ? 'bg-brand text-forest hover:bg-white'
                      : 'ring-1 ring-white/25 hover:bg-brand hover:text-forest hover:ring-brand',
                  )}
                >
                  {plan.cta.label}
                </Link>
              </div>
            ))}
          </div>

          {/* Comparison table */}
          <div className="overflow-x-auto border-t border-white/10">
            <table className="w-full min-w-[46rem] table-fixed border-collapse text-left">
              <thead className="sr-only">
                <tr>
                  <th>Feature</th>
                  {plans.map((p) => (
                    <th key={p.name}>{p.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sections.map((sec) => (
                  <Fragment key={sec.title}>
                    <tr className="pt-row">
                      <th colSpan={4} className="bg-white/[0.05] px-8 py-3.5 text-left text-sm font-semibold">
                        {sec.title}
                      </th>
                    </tr>
                    {sec.rows.map((row) => (
                      <tr key={row.label} className="pt-row border-t border-white/10 transition-colors hover:bg-white/[0.03]">
                        <th scope="row" className="px-8 py-5 text-left font-normal text-white/85">
                          {row.label}
                        </th>
                        {row.values.map((v, i) => (
                          <td
                            key={i}
                            className={cn('border-l border-white/10 px-4 py-5 text-center', plans[i].featured && 'bg-white/[0.035]')}
                          >
                            <Mark value={v} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}