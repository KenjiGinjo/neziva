import { useMemo, useState } from 'react'
import { ContactFaq } from '@/components/contact-faq'
import { ContactHero } from '@/components/contact-hero'
import { ContactLocation } from '@/components/contact-location'
import { ContactMain } from '@/components/contact-main'
import { ContactTrust } from '@/components/contact-trust'
import { useSchemaPatch } from '@/hooks'
import { createContactSchema, useI18n } from '@/i18n'

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
  const { m } = useI18n()
  const schema = useMemo(() => createContactSchema(m), [m])
  const { form, dto, patch } = useSchemaPatch(schema, defaultContactValues)

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
      <ContactFaq />
      <ContactLocation />
    </div>
  )
}
