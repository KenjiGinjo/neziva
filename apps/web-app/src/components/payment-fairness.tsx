import { useI18n } from '@/i18n'

export function PaymentFairness() {
  const { m } = useI18n()
  const p = m.payment

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{p.fairnessTitle}</h2>
          <p className="text-lg text-gray-600 leading-relaxed">{p.fairnessIntro}</p>
        </div>
        <div className="max-w-3xl space-y-8">
          {p.fairness.map(item => (
            <div key={item.title}>
              <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
