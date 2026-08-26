import { useI18n } from '@/i18n'
import { Breadcrumb } from './breadcrumb'

export function AboutHero() {
  const { m } = useI18n()
  return (
    <section className="pt-32 pb-16 bg-gradient-to-br from-blue-50 via-purple-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <Breadcrumb items={[{ label: m.nav.home, href: '/' }, { label: m.nav.about }]} className="mb-6" />
        <div className="max-w-4xl">
          <p className="text-[#4F46E5] font-medium mb-4">{m.about.heroEyebrow}</p>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">{m.about.heroTitle}</h1>
          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">{m.about.heroBody}</p>
        </div>
      </div>
    </section>
  )
}
