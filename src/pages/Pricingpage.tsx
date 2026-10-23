import PageHero from '@/components/common/PageHero'
import PricingTable from '@/components/layout/PricingTable'
import FaqSection from '@/components/sections/FaqSection'
import ProcessSection from '@/components/sections/ProcessSection'
import CTASection from '@/components/sections/CTASection'
import { pricing } from '@/content/site'

export default function PricingPage() {
  return (
    <>
      <PageHero title={pricing.title} sub={pricing.sub} />
      <PricingTable />
      <FaqSection />
      <ProcessSection />
      <CTASection />
    </>
  )
}