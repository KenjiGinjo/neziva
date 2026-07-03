import { CheckCircle, Code, Mail, Shield } from 'lucide-react'

const items = [
  { icon: Mail, label: '24h Response', desc: 'On business days (UTC+8)' },
  { icon: CheckCircle, label: 'Free Discovery Call', desc: '30 min, no commitment' },
  { icon: Code, label: 'In-House Development', desc: 'We write the code ourselves' },
  { icon: Shield, label: 'Registered Business', desc: 'Licensed in Chongqing, China' },
]

export function ContactTrust() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {items.map(({ icon: Icon, label, desc }) => (
            <div key={label} className="text-center">
              <div className="w-12 h-12 bg-[#4F46E5]/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Icon className="h-6 w-6 text-[#4F46E5]" />
              </div>
              <div className="font-bold text-gray-900 mb-1">{label}</div>
              <div className="text-gray-600 text-sm">{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
