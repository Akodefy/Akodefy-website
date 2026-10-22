import PageHero from '@/components/PageHero'
import ValuesPinSection from '@/components/ValuesPinSection'
import AboutSection from '@/components/AboutSection'
import StatsSection from '@/components/StatsSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import CTASection from '@/components/CTASection'
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