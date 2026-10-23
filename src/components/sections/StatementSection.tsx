import { ScrollReveal } from '@/components/react-bits'
import { statement } from '@/content/site'

export default function StatementSection() {
  return (
    <section className="bg-paper pb-16 pt-10 md:pb-24 md:pt-16">
      <div className="container-x">
        <ScrollReveal
          baseOpacity={0.1}
          enableBlur
          baseRotation={2}
          blurStrength={6}
          textClassName="font-display font-medium leading-[1.06] tracking-[-0.035em] text-[clamp(2rem,4.6vw,4.5rem)]"
        >
          {statement}
        </ScrollReveal>
      </div>
    </section>
  )
}
