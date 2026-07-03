import { HomeAbout } from '@/components/home-about'
import { HomeContact } from '@/components/home-contact'
import { HomeHero } from '@/components/home-hero'
import { HomePortfolio } from '@/components/home-portfolio'
import { HomeServices } from '@/components/home-services'
import { HomeWhyChoose } from '@/components/home-why-choose'
import { SectionCTA } from '@/components/section-cta'
import { SectionProcess } from '@/components/section-process'
import { SectionTechnologies } from '@/components/section-technologies'

export function PageHome() {
  return (
    <div className="bg-white text-gray-900">
      <HomeHero />
      <HomeWhyChoose />
      <HomeServices />
      <HomePortfolio />
      <SectionProcess />
      <SectionTechnologies />
      {/* <HomeTestimonials /> */}
      <HomeAbout />
      <SectionCTA variant="home" />
      <HomeContact />
    </div>
  )
}
