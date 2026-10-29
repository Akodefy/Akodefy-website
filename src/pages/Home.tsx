import SEOHead from '@/components/common/SEOHead'
import HeroSection from '@/components/sections/HeroSection'
import StatementSection from '@/components/sections/StatementSection'
import ServicesSection from '@/components/sections/ServicesSection'
import TechMarquee from '@/components/sections/TechMarquee'
import AboutSection from '@/components/sections/AboutSection'
import StatsSection from '@/components/sections/StatsSection'
import CurvedLoopSection from '@/components/sections/CurvedLoopSection'
import ProcessSection from '@/components/sections/ProcessSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import PortfolioSection from '@/components/sections/PortfolioSection'
import PartnersSection from '@/components/sections/Partnerssection'
import CTASection from '@/components/sections/CTASection'

const homeSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://www.akodefy.com/#webpage",
  "url": "https://www.akodefy.com/",
  "name": "Akodefy — Web Development, Mobile Apps & Digital Marketing | Coimbatore",
  "description": "Akodefy is a technology company in Coimbatore building high-performance web apps, mobile applications, and digital marketing systems for ambitious businesses.",
  "isPartOf": { "@id": "https://www.akodefy.com/#website" },
  "about": { "@id": "https://www.akodefy.com/#organization" },
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": ["h1", ".hero-sub", ".statement-text"]
  },
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.akodefy.com/" }]
  }
}

export default function Home() {
  return (
    <>
      <SEOHead
        title="Akodefy — Web Development, Mobile Apps & Digital Marketing | Coimbatore"
        description="Akodefy is a technology company in Coimbatore building high-performance web apps, mobile applications, and digital marketing systems for ambitious businesses."
        canonical="https://www.akodefy.com/"
        schema={homeSchema}
      />
      <HeroSection />
      <PartnersSection />
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