import { useI18n } from '@/i18n'
import { Breadcrumb } from './breadcrumb'

export function ServicesHero() {
  const { m } = useI18n()
  return (
    <section className="pt-32 pb-16 bg-gradient-to-br from-blue-50 via-purple-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <Breadcrumb items={[{ label: m.nav.home, href: '/' }, { label: m.nav.services }]} className="mb-6" />
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">{m.services.heroTitle}</h1>
          <p className="text-xl text-gray-600 leading-relaxed">{m.services.heroSubtitle}</p>
        </div>
      </div>
    </section>
  )
}
