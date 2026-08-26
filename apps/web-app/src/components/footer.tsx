import { Mail } from 'lucide-react'
import { Link } from 'wouter'
import { Logo } from '@/components/logo'
import { useI18n } from '@/i18n'

export function Footer() {
  const currentYear = new Date().getFullYear()
  const { m, fmt } = useI18n()

  return (
    <footer className="bg-gray-900 text-gray-300 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <Logo size="sm" withBox withText href="/" className="mb-4" />
            <p className="text-gray-400 leading-relaxed">
              {m.footer.tagline}
            </p>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-4">{m.footer.services}</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  {m.footer.discovery}
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  {m.footer.poc}
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  {m.footer.implementation}
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  {m.footer.support}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-4">{m.footer.company}</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  {m.footer.aboutUs}
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-white transition-colors">
                  {m.nav.portfolio}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  {m.nav.blog}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  {m.nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-4">{m.footer.contactInfo}</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-[#4F46E5]" />
                <a href="mailto:kenjiginjo@gmail.com" className="hover:text-white transition-colors">
                  kenjiginjo@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <p className="text-gray-500 text-sm text-center">
            {fmt(m.footer.copyright, { year: currentYear })}
          </p>
        </div>
      </div>
    </footer>
  )
}
