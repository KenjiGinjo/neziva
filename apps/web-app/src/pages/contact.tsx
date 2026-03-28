import { vContactSubmit } from '@neziva/validations'
import { useState } from 'react'
import { SectionCTA } from '@/components/section-cta'
import { ContactFaq } from '@/components/contact-faq'
import { ContactHero } from '@/components/contact-hero'
import { ContactLocation } from '@/components/contact-location'
import { ContactMain } from '@/components/contact-main'
import { ContactMethods } from '@/components/contact-methods'
import { ContactTrust } from '@/components/contact-trust'
import { useSchemaPatch } from '@/hooks'

const defaultContactValues = {
  name: '',
  company: '',
  email: '',
  phone: '',
  projectType: '',
  description: '',
  budget: '',
}

export function PageContact() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const { form, dto, patch } = useSchemaPatch(vContactSubmit, defaultContactValues)

  return (
    <div className="font-sans bg-white text-gray-800">
      <ContactHero />
      <ContactMain
        form={form}
        dto={dto}
        patch={patch}
        submitSuccess={submitSuccess}
        setSubmitSuccess={setSubmitSuccess}
      />
      <ContactMethods />
      <ContactFaq openIndex={openFaqIndex} onOpenChange={setOpenFaqIndex} />
      <SectionCTA variant="contact" />
      <ContactTrust />
      <ContactLocation />
    </div>
  )
}
