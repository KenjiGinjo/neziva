import { ArrowRight, Cog, FlaskConical, Lightbulb, Mail } from 'lucide-react'
import { Link } from 'wouter'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/i18n'

const CONTACT_EMAIL = 'kenjiginjo@gmail.com'

const SERVICE_META = [
  { href: '/services#strategy', icon: Lightbulb, iconColor: 'text-[#F97316]', featured: false },
  { href: '/services#poc', icon: FlaskConical, iconColor: 'text-[#10B981]', featured: true },
  { href: '/services#implementation', icon: Cog, iconColor: 'text-[#4F46E5]', featured: false },
] as const

export function HomeServices() {
  const { m } = useI18n()

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{m.home.servicesTitle}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {m.home.servicesSubtitle}
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {m.home.services.map((service, i) => {
            const meta = SERVICE_META[i]
            const Icon = meta.icon
            const cardClass = meta.featured
              ? 'bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] rounded-xl p-8 text-white hover:shadow-xl transition-all relative overflow-hidden'
              : 'bg-white rounded-xl border-2 border-gray-200 p-8 hover:border-[#4F46E5] hover:shadow-xl transition-all'

            return (
              <div key={service.title} className={cardClass}>
                {meta.featured && (
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
                )}
                <div className={meta.featured ? 'relative' : ''}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold">{service.title}</h3>
                    <Icon className={`h-8 w-8 ${meta.featured ? 'text-white' : meta.iconColor}`} />
                  </div>
                  <div className="mb-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                      meta.featured ? 'bg-white/20 backdrop-blur-sm' : 'bg-green-100 text-[#10B981]'
                    }`}
                    >
                      {service.duration}
                    </span>
                  </div>
                  <div className="mb-1">
                    <span className="text-3xl font-bold">{service.price}</span>
                  </div>
                  <p className={`text-sm mb-4 ${meta.featured ? 'opacity-80' : 'text-gray-500'}`}>
                    {service.priceNote}
                  </p>
                  <p className={`mb-6 leading-relaxed ${meta.featured ? 'opacity-90' : 'text-gray-600'}`}>
                    {service.description}
                  </p>
                  <div className="flex flex-col gap-3">
                    <a href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(service.mailtoSubject)}`}>
                      <Button
                        variant={meta.featured ? 'secondary' : 'default'}
                        className={`w-full ${meta.featured ? 'bg-white text-[#4F46E5] hover:bg-gray-100' : 'bg-[#4F46E5] hover:bg-blue-700 text-white'}`}
                      >
                        <Mail className="mr-2 h-4 w-4" />
                        {service.cta}
                      </Button>
                    </a>
                    <Link
                      href={meta.href}
                      className={`font-semibold inline-flex items-center text-sm ${
                        meta.featured ? 'text-white hover:opacity-80' : 'text-[#4F46E5] hover:text-[#7C3AED]'
                      } transition`}
                    >
                      {m.common.learnMore}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <p className="text-center text-gray-500 text-sm mt-10">
          {m.home.servicesNote}
        </p>
      </div>
    </section>
  )
}
