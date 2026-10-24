import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { pricing } from '@/content/site'

export default function FaqSection() {
  return (
    <section className="bg-paper py-14 md:py-20">
      <div className="container-x grid gap-12 md:grid-cols-12 md:gap-10">
        <h2 className="font-display text-[clamp(2.4rem,5.5vw,5rem)] font-semibold leading-[0.98] tracking-[-0.045em] md:col-span-5">
          {pricing.faqTitle}
        </h2>
        <Accordion type="single" collapsible className="md:col-span-7">
          {pricing.faq.map((f, i) => (
            <AccordionItem key={f.q} value={`q-${i}`} className="border-white/10">
              <AccordionTrigger className="cursor-target py-6 text-left font-display text-xl font-medium tracking-[-0.02em] hover:no-underline md:text-2xl">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="max-w-xl pb-6 text-lg text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}