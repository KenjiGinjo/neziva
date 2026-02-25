import { HomeAbout } from '@/components/home-about'
import { HomeAIDemo } from '@/components/home-ai-demo'
import { HomeContact } from '@/components/home-contact'
import { HomeCTA } from '@/components/home-cta'
import { HomeHero } from '@/components/home-hero'
import { HomePortfolio } from '@/components/home-portfolio'
import { HomeProcess } from '@/components/home-process'
import { HomeServices } from '@/components/home-services'
import { HomeTechnologies } from '@/components/home-technologies'
// import { HomeTestimonials } from '@/components/home-testimonials'
import { HomeWhyChoose } from '@/components/home-why-choose'

export function PageHome() {
  return (
    <div className="bg-white text-gray-900">
      <HomeHero />
      <HomeWhyChoose />
      <HomeServices />
      <HomePortfolio />
      <HomeAIDemo />
      <HomeProcess />
      <HomeTechnologies />
      {/* <HomeTestimonials /> */}
      <HomeAbout />
      <HomeCTA />
      <HomeContact />
    </div>
  )
}
