import { CountUp } from '@/components/react-bits'
import { stats } from '@/content/site'

/** Renders nothing until verified numbers are added to `stats` in content/site.ts. */
export default function StatsSection() {
  if (!stats.length) return null

  return (
    <section className="bg-paper py-12 md:py-20">
      <div className="container-x grid gap-12 border-t border-border pt-12 md:grid-cols-[repeat(auto-fit,minmax(12rem,1fr))]">
        {stats.map((s) => (
          <div key={s.label}>
            <p className="font-display text-[clamp(3.5rem,7vw,6.5rem)] font-semibold leading-none tracking-[-0.05em]">
              <CountUp to={s.value} duration={2.2} separator="," />
              {s.suffix && <span className="text-brand-deep">{s.suffix}</span>}
            </p>
            <p className="mt-3 text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}