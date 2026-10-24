import SplitHeading from './SplitHeading'

export default function PageHero({ title, sub }: { title: string; sub?: string }) {
  return (
    <section className="bg-paper pb-16 pt-28 md:pb-20 md:pt-36">
      <div className="container-x">
        <SplitHeading
          as="h1"
          mode="load"
          delay={0.45}
          text={title}
          className="max-w-5xl font-display text-[clamp(2.9rem,7.6vw,7.75rem)] font-semibold leading-[0.94] tracking-[-0.05em]"
        />
        {sub && <p className="mt-9 max-w-xl text-lg text-muted-foreground">{sub}</p>}
      </div>
    </section>
  )
}
