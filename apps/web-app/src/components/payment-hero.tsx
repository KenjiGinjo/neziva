import { Breadcrumb } from '@/components/breadcrumb'
import { useI18n } from '@/i18n'

export function PaymentHero() {
  const { m } = useI18n()
  return (
    <section className="pt-32 pb-16 bg-gradient-to-br from-blue-50 via-purple-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <Breadcrumb items={[{ label: m.nav.home, href: '/' }, { label: m.nav.payment }]} className="mb-6" />
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900">{m.payment.heroTitle}</h1>
        </div>
      </div>
    </section>
  )
}
