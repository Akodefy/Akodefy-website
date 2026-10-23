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
      <PageHero title={about.heroTitle} sub={about.heroSub} />
      <ValuesPinSection />
      <AboutSection />
      <StatsSection />
      <TestimonialsSection />
      <CTASection />
    </>
  )
}