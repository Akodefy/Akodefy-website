import HeroSection from '@/components/sections/HeroSection'
import MarqueeSection from '@/components/sections/MarqueeSection'
import StatementSection from '@/components/sections/StatementSection'
import ServicesSection from '@/components/sections/ServicesSection'
import TechMarquee from '@/components/sections/TechMarquee'
import AboutSection from '@/components/sections/AboutSection'
import StatsSection from '@/components/sections/StatsSection'
import CurvedLoopSection from '@/components/sections/CurvedLoopSection'
import ProcessSection from '@/components/sections/ProcessSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import PortfolioSection from '@/components/sections/PortfolioSection'
import CTASection from '@/components/sections/CTASection'

export default function Home() {
  return (
    <>
      <HeroSection />
      <MarqueeSection />
      <StatementSection />
      <ServicesSection />
      <TechMarquee />
      <AboutSection showLink />
      <StatsSection />
      <CurvedLoopSection />
      <ProcessSection />
      <TestimonialsSection />
      <PortfolioSection />
      <CTASection />
    </>
  )
}
