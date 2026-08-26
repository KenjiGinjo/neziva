import { CheckCircle, Code, Mail, Shield } from 'lucide-react'
import { useI18n } from '@/i18n'

const ICONS = [Mail, CheckCircle, Code, Shield] as const

export function ContactTrust() {
  const { m } = useI18n()

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {m.contact.trust.map((item, i) => {
            const Icon = ICONS[i]
            return (
              <div key={item.label} className="text-center">
                <div className="w-12 h-12 bg-[#4F46E5]/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Icon className="h-6 w-6 text-[#4F46E5]" />
                </div>
                <div className="font-bold text-gray-900 mb-1">{item.label}</div>
                <div className="text-gray-600 text-sm">{item.desc}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
