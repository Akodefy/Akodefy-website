import { Link } from 'react-router-dom'
import { about } from '@/content/site'

export default function AboutSection({ showLink = false }: { showLink?: boolean }) {
  return (
    <section className="bg-paper py-24 md:py-40">
      <div className="container-x grid gap-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="md:sticky md:top-32">
            <h2 className="font-display text-[clamp(2.4rem,5.5vw,5rem)] font-semibold leading-[0.98] tracking-[-0.045em]">
              {about.title}
            </h2>
            <ul className="mt-10 max-w-md divide-y divide-border border-y border-border">
              {about.checks.map((c) => (
                <li key={c} className="py-3.5 text-base text-foreground/85">
                  {c}
                </li>
              ))}
            </ul>
            {showLink && (
              <Link to="/about" className="cursor-target mt-10 inline-block underline decoration-brand decoration-2 underline-offset-8">
                More about Akodefy
              </Link>
            )}
          </div>
        </div>

        <div className="md:col-span-7">
          {about.pillars.map((p) => (
            <div key={p.title} className="grid gap-4 border-t border-border py-10 first:border-t-0 first:pt-0 md:grid-cols-5 md:gap-10 md:py-14">
              <h3 className="font-display text-3xl font-semibold leading-tight tracking-[-0.035em] md:col-span-2 md:text-4xl">
                {p.title}
              </h3>
              <p className="text-lg text-muted-foreground md:col-span-3">{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
