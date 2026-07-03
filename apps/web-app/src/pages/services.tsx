import { useEffect } from 'react'
import { SectionCTA } from '@/components/section-cta'
import { ServicesComparison } from '@/components/services-comparison'
import { ServicesHero } from '@/components/services-hero'
import { ServicesImplementation } from '@/components/services-implementation'
import { ServicesMaintenance } from '@/components/services-maintenance'
import { ServicesPOC } from '@/components/services-poc'
import { ServicesProcess } from '@/components/services-process'
import { ServicesStrategy } from '@/components/services-strategy'

export function PageServices() {
  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (hash) {
      const el = document.getElementById(hash)
      if (el) {
        requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }))
      }
    }
  }, [])

  return (
    <div className="bg-white text-gray-900">
      <ServicesHero />
      <ServicesStrategy />
      <ServicesPOC />
      <ServicesImplementation />
      <ServicesMaintenance />
      <ServicesComparison />
      <ServicesProcess />
      <SectionCTA variant="services" />
    </div>
  )
}
