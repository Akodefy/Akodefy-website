import PageHero from '@/components/PageHero'
import PortfolioSection from '@/components/PortfolioSection'
import CTASection from '@/components/CTASection'
import { pages } from '@/content/site'

// Only reachable when content/site.ts has real projects (see App.tsx).
export default function PortfolioPage() {
  return (
    <>
      <PageHero title={pages.portfolio.title} />
      <PortfolioSection />
      <CTASection />
    </>
  )
}
