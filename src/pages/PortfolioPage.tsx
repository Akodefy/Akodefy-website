import PageHero from '@/components/common/PageHero'
import PortfolioSection from '@/components/sections/PortfolioSection'
import CTASection from '@/components/sections/CTASection'
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
