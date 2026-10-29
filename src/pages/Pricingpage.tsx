import SEOHead from '@/components/common/SEOHead'
import PageHero from '@/components/common/PageHero'
import PricingTable from '@/components/layout/PricingTable'
import FaqSection from '@/components/sections/FaqSection'
import ProcessSection from '@/components/sections/ProcessSection'
import CTASection from '@/components/sections/CTASection'
import { pricing } from '@/content/site'

export default function PricingPage() {
  return (
    <>
      <SEOHead
        title="Pricing — Web Development & Digital Marketing | Akodefy"
        description="Transparent pricing for web development, mobile apps, and digital marketing. Projects from $5k to enterprise scale. No hidden costs."
        canonical="https://www.akodefy.com/pricing"
        schema={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": pricing.faq.map((f) => ({
            "@type": "Question",
            "name": f.q,
            "acceptedAnswer": { "@type": "Answer", "text": f.a },
          })),
        }}
      />
      <PageHero title={pricing.title} sub={pricing.sub} />
      <PricingTable />
      <FaqSection />
      <ProcessSection />
      <CTASection />
    </>
  )
}