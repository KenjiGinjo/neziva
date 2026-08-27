import { ArrowRight, Home } from 'lucide-react'
import { Link } from 'wouter'
import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/i18n'

export function PageNotFound() {
  const { m } = useI18n()

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-[#667eea] to-[#764ba2] opacity-5" />
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#4F46E5] rounded-full blur-3xl opacity-10" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#7C3AED] rounded-full blur-3xl opacity-10" />

        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <div className="mb-8 flex justify-center">
            <Logo size="xl" withBox href="/" />
          </div>

          <h1 className="text-6xl md:text-8xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">{m.notFound.title}</h2>
          <p className="text-lg text-gray-600 mb-12 max-w-xl mx-auto">{m.notFound.body}</p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/">
              <Button className="bg-[#F97316] hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold text-lg inline-flex items-center">
                <Home className="mr-2 h-5 w-5" />
                {m.notFound.backHome}
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="border-2 border-[#4F46E5] text-[#4F46E5] hover:bg-[#4F46E5]/5 px-8 py-4 rounded-lg font-semibold text-lg inline-flex items-center">
                {m.notFound.contact}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>

          <div className="mt-16 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-4">{m.notFound.quickLinks}</p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="/services" className="text-[#4F46E5] font-medium hover:text-[#7C3AED] transition-colors">
                {m.nav.services}
              </Link>
              <Link href="/portfolio" className="text-[#4F46E5] font-medium hover:text-[#7C3AED] transition-colors">
                {m.nav.portfolio}
              </Link>
              <Link href="/about" className="text-[#4F46E5] font-medium hover:text-[#7C3AED] transition-colors">
                {m.nav.about}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
