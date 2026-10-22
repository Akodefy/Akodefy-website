import PageHero from '@/components/PageHero'
import ServicesSection from '@/components/ServicesSection'
import ProcessSection from '@/components/ProcessSection'
import CTASection from '@/components/CTASection'
import { pages } from '@/content/site'

export default function ServicesPage() {
  return (
    <>
      <PageHero title={pages.services.title} sub={pages.services.sub} />
      <ServicesSection showHeader={false} />
      <ProcessSection />
      <CTASection />
    </>
  )
}
