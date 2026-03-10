import { AboutApproach } from '@/components/about-approach'
import { AboutConnect } from '@/components/about-connect'
import { AboutHero } from '@/components/about-hero'
import { AboutIndustries } from '@/components/about-industries'
import { AboutMain } from '@/components/about-main'
import { AboutTestimonials } from '@/components/about-testimonials'
import { AboutValues } from '@/components/about-values'
import { AboutWhyDifferent } from '@/components/about-why-different'
import { SectionCTA } from '@/components/section-cta'

export function PageAbout() {
  return (
    <div className="bg-white text-gray-900">
      <AboutHero />
      <AboutMain />
      <AboutWhyDifferent />
      <AboutIndustries />
      <AboutApproach />
      <AboutValues />
      <AboutConnect />
      <SectionCTA variant="about" />
      {/* <AboutTestimonials /> */}
    </div>
  )
}
