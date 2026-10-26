import { ScrollReveal } from '@/components/react-bits'
import { statement } from '@/content/site'

export default function StatementSection() {
  return (
    <section className="bg-paper pb-16 pt-10 md:pb-24 md:pt-16">
      <div className="container-x">
        {/* Opening quote mark */}
        <span
          aria-hidden
          className="block font-display text-[clamp(3.5rem,7vw,6rem)] leading-none text-brand select-none mb-1"
        >
          &ldquo;
        </span>

        <ScrollReveal
          baseOpacity={0.1}
          enableBlur
          baseRotation={2}
          blurStrength={6}
          textClassName="font-display font-medium leading-[1.06] tracking-[-0.035em] text-[clamp(1.6rem,3vw,2.8rem)]"
        >
          {statement}
        </ScrollReveal>

        {/* Closing quote mark */}
        <span
          aria-hidden
          className="block text-right font-display text-[clamp(4rem,8vw,7rem)] leading-none text-brand select-none"
        >
          &rdquo;
        </span>
      </div>
    </section>
  )
}


