import { vContactSubmit } from '@neziva/validations'
import { useState } from 'react'
import { ContactHero } from '@/components/contact-hero'
import { ContactLocation } from '@/components/contact-location'
import { ContactMain } from '@/components/contact-main'
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
      <ContactTrust />
      <ContactLocation />
    </div>
  )
}
