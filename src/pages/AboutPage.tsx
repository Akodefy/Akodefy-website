import SEOHead from '@/components/common/SEOHead'
import PageHero from '@/components/common/PageHero'
import ValuesPinSection from '@/components/sections/ValuesPinSection'
import AboutSection from '@/components/sections/AboutSection'
import StatsSection from '@/components/sections/StatsSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import CTASection from '@/components/sections/CTASection'
import { about } from '@/content/site'

export default function AboutPage() {
  return (
    <>
      <SEOHead title="About Akodefy — Our Team, Mission & Values | Coimbatore" description="Learn about Akodefy, a technology company in Coimbatore. Meet the engineers and designers obsessed with building exceptional digital products." canonical="https://www.akodefy.com/about" />
      <PageHero title={about.heroTitle} sub={about.heroSub} />
      <ValuesPinSection />
      <AboutSection />
      <StatsSection />
      <TestimonialsSection />
      <CTASection />
    </>
  )
}