import { CheckCircle } from 'lucide-react'

const rows = [
  { feature: 'Duration', values: ['2-4 hours', '1-3 weeks', '1-3 months', 'Monthly'] },
  { feature: 'Price Range', values: ['$800 - $1,500', '$5,000 - $15,000', '$20,000+', '$2,000 - $5,000/mo'], highlight: true },
  { feature: 'Best For', values: ['Exploring AI opportunities', 'Validating feasibility', 'Full implementation', 'Existing systems'] },
  { feature: 'Strategic Planning', values: [true, true, true, false] },
  { feature: 'Working Prototype', values: [false, true, true, false] },
  { feature: 'Production Deployment', values: [false, false, true, true] },
  { feature: 'Ongoing Support', values: [false, false, '30 days', true] },
  { feature: 'Documentation', values: [true, true, true, true] },
]

export function ServicesComparison() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Compare Our Services</h2>
          <p className="text-xl text-gray-600">Find the perfect solution for your business needs</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white">
                  <th className="px-6 py-4 text-left font-semibold">Feature</th>
                  <th className="px-6 py-4 text-center font-semibold">Strategy Workshop</th>
                  <th className="px-6 py-4 text-center font-semibold">POC Development</th>
                  <th className="px-6 py-4 text-center font-semibold">End-to-End System</th>
                  <th className="px-6 py-4 text-center font-semibold">Optimization</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {rows.map((row, i) => (
                  <tr key={i} className={`hover:bg-gray-50 ${i === 1 ? 'bg-blue-50' : ''}`}>
                    <td className="px-6 py-4 font-semibold text-gray-900">{row.feature}</td>
                    {row.values.map((value, j) => (
                      <td key={j} className={`px-6 py-4 text-center ${row.highlight ? 'font-bold text-[#4F46E5]' : 'text-gray-700'}`}>
                        {typeof value === 'boolean'
                          ? (
                              value
                                ? (
                                    <CheckCircle className="h-6 w-6 text-[#10B981] mx-auto" />
                                  )
                                : (
                                    <span className="text-gray-300">—</span>
                                  )
                            )
                          : (
                              value
                            )}
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
