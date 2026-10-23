import Asset from '@/components/common/Asset'
import { projects } from '@/content/site'

/** Renders only real projects from content/site.ts. Empty list renders nothing. */
export default function PortfolioSection() {
  if (!projects.length) return null

  return (
    <section className="bg-paper py-20 md:py-32">
      <div className="container-x grid gap-x-6 gap-y-16 md:grid-cols-2">
        {projects.map((p, i) => {
          const cls = `cursor-target group block ${i % 2 ? 'md:mt-24' : ''}`
          const body = (
            <>
              <div className="overflow-hidden rounded-[1.75rem]">
                <Asset
                  src={p.image}
                  alt={p.title}
                  className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
              </div>
              <div className="mt-5 flex items-baseline justify-between gap-6">
                <h3 className="font-display text-3xl font-semibold tracking-[-0.035em]">{p.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {p.category}
                  {p.year ? `, ${p.year}` : ''}
                </p>
              </div>
              {p.summary && <p className="mt-2 max-w-md text-muted-foreground">{p.summary}</p>}
            </>
          )
          return p.href ? (
            <a key={p.title} href={p.href} target="_blank" rel="noopener noreferrer" className={cls}>
              {body}
            </a>
          ) : (
            <div key={p.title} className={cls}>
              {body}
            </div>
          )
        })}
      </div>
    </section>
  )
}
