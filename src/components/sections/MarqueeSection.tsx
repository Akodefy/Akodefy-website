import { ScrollVelocity } from '@/components/react-bits'
import { services } from '@/content/site'

const names = services.map((s) => s.title)
const rowA = names.slice(0, 3).join(' / ') + ' / '
const rowB = names.slice(3).join(' / ') + ' / '

export default function MarqueeSection() {
  return (
    <section aria-label="Services" className="overflow-hidden bg-paper pt-12 pb-8 md:pt-20 md:pb-10">
      <ScrollVelocity
        texts={[rowA, rowB]}
        velocity={55}
        numCopies={6}
        className="font-display text-[clamp(2.5rem,5.5vw,5.5rem)] font-semibold leading-[1.05] tracking-[-0.05em] text-ink"
      />
    </section>
  )
}
