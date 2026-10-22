import { ScrollVelocity } from '@/components/rb'
import { services } from '@/content/site'

const names = services.map((s) => s.title)
const rowA = names.slice(0, 3).join(' / ') + ' / '
const rowB = names.slice(3).join(' / ') + ' / '

export default function MarqueeSection() {
  return (
    <section aria-label="Services" className="overflow-hidden bg-paper py-12 md:py-20">
      <ScrollVelocity
        texts={[rowA, rowB]}
        velocity={55}
        numCopies={6}
        className="font-display text-[clamp(3rem,8.5vw,8rem)] font-semibold leading-[1.05] tracking-[-0.05em] text-ink"
      />
    </section>
  )
}
