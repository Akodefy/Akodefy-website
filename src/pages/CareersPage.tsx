import { useState } from 'react'
import CareersHero from '@/components/careers/CareersHero'
import WhySection from '@/components/careers/WhySection'
import PerksSection from '@/components/careers/PerksSection'
import RolesSection from '@/components/careers/RolesSection'
import HiringSteps from '@/components/careers/HiringSteps'
import ApplicationForm from '@/components/careers/ApplicationForm'

import { type JobRole } from '@/content/site'

export default function CareersPage() {
  const [applyTarget, setApplyTarget] = useState<JobRole | null | undefined>(undefined)

  // undefined  = form hidden
  // null       = speculative application (no role preselected)
  // JobRole    = specific role preselected
  const showForm = applyTarget !== undefined

  const openApply = (role: JobRole | null) => {
    setApplyTarget(role)
    setTimeout(() => {
      document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 80)
  }

  const closeApply = () => setApplyTarget(undefined)

  return (
    <>
      <CareersHero />
      <WhySection />
      <PerksSection />
      <RolesSection onApply={openApply} />
      <HiringSteps />

      <ApplicationForm
        preselected={showForm ? (applyTarget ?? null) : null}
        onClose={closeApply}
      />
    </>
  )
}
