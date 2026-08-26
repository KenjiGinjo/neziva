import { useI18n } from '@/i18n'
import { Breadcrumb } from './breadcrumb'

export function BlogHero() {
  const { m } = useI18n()
  return (
    <section className="pt-32 pb-16 bg-gradient-to-br from-blue-50 via-purple-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <Breadcrumb items={[{ label: m.nav.home, href: '/' }, { label: m.nav.blog }]} className="mb-6" />
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">{m.blog.heroTitle}</h1>
        <p className="text-xl text-gray-600 max-w-3xl leading-relaxed">{m.blog.heroSubtitle}</p>
      </div>
    </section>
  )
}
