import { ArrowRight, Mail, Sparkles } from 'lucide-react'
import { Link } from 'wouter'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/i18n'

const CONTACT_EMAIL = 'kenjiginjo@gmail.com'

export function HomePortfolio() {
  const { m } = useI18n()

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 bg-[#4F46E5]/10 text-[#4F46E5] px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
            <Sparkles className="h-4 w-4" />
            {m.home.portfolioBadge}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {m.home.portfolioTitle}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {m.home.portfolioBody}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">{m.home.portfolioWhatYouGet}</h3>
          <ul className="space-y-4 mb-10">
            {m.home.portfolioPerks.map(item => (
              <li key={item} className="flex items-start gap-3 text-gray-700">
                <span className="mt-1.5 w-2 h-2 rounded-full bg-[#4F46E5] shrink-0" />
                {item}
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row gap-4">
            <a href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(m.home.portfolioMailSubject)}`}>
              <Button className="w-full sm:w-auto bg-[#4F46E5] hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg inline-flex items-center">
                <Mail className="mr-2 h-5 w-5" />
                {m.home.portfolioApply}
              </Button>
            </a>
            <Link href="/services">
              <Button variant="outline" className="w-full sm:w-auto px-8 py-4 rounded-lg font-semibold text-lg inline-flex items-center">
                {m.common.viewServicesShort}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
