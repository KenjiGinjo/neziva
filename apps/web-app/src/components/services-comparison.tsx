import { CheckCircle } from 'lucide-react'
import { useI18n } from '@/i18n'

export function ServicesComparison() {
  const { m } = useI18n()
  const c = m.services.comparison

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{c.title}</h2>
          <p className="text-xl text-gray-600">{c.subtitle}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white">
                  <th className="px-6 py-4 text-left font-semibold">{c.feature}</th>
                  {c.cols.map(col => (
                    <th key={col} className="px-6 py-4 text-center font-semibold">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {c.rows.map((row, i) => (
                  <tr key={row.feature} className={`hover:bg-gray-50 ${i === 1 ? 'bg-blue-50' : ''}`}>
                    <td className="px-6 py-4 font-semibold text-gray-900">{row.feature}</td>
                    {row.values.map((value, j) => (
                      <td key={j} className={`px-6 py-4 text-center ${row.highlight ? 'font-bold text-[#4F46E5]' : 'text-gray-700'}`}>
                        {typeof value === 'boolean'
                          ? (
                              value
                                ? <CheckCircle className="h-6 w-6 text-[#10B981] mx-auto" />
                                : <span className="text-gray-300">—</span>
                            )
                          : value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
