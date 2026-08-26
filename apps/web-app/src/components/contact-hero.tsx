import { useI18n } from '@/i18n'
import { Breadcrumb } from './breadcrumb'

export function ContactHero() {
  const { m } = useI18n()
  return (
    <section className="pt-32 pb-16 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-6">
        <Breadcrumb items={[{ label: m.nav.home, href: '/' }, { label: m.nav.contact }]} className="mb-4" />
        <h1 className="text-5xl font-bold text-gray-900 mb-4">{m.contact.heroTitle}</h1>
        <p className="text-xl text-gray-600 max-w-3xl">{m.contact.heroSubtitle}</p>
      </div>
    </section>
  )
}
