import { CareersHero } from '@/components/careers-hero'
import { CareersJobs } from '@/components/careers-jobs'

export function PageCareers() {
  return (
    <div className="bg-white text-gray-900">
      <CareersHero />
      <CareersJobs />
    </div>
  )
}
