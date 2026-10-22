import HeroSection from '@/components/HeroSection'
import MarqueeSection from '@/components/MarqueeSection'
import StatementSection from '@/components/StatementSection'
import ServicesSection from '@/components/ServicesSection'
import AboutSection from '@/components/AboutSection'
import StatsSection from '@/components/StatsSection'
import CurvedLoopSection from '@/components/CurvedLoopSection'
import ProcessSection from '@/components/ProcessSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import PortfolioSection from '@/components/PortfolioSection'
import CTASection from '@/components/CTASection'

export default function Home() {
  return (
    <>
      <HeroSection />
      <MarqueeSection />
      <StatementSection />
      <ServicesSection />
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
