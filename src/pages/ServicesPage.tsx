import PageHero from '@/components/common/PageHero'
import ServicesSection from '@/components/sections/ServicesSection'
import ProcessSection from '@/components/sections/ProcessSection'
import CTASection from '@/components/sections/CTASection'
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
