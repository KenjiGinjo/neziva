import { Mail } from 'lucide-react'
import { Link, useLocation } from 'wouter'
import { Logo } from '@/components/logo'
import { requestSectionScroll } from '@/components/scroll-on-navigate'
import { useI18n } from '@/i18n'
import { withLocalePrefix } from '@/i18n/locale'

function FooterServiceLink({ id, children }: { id: string, children: React.ReactNode }) {
  const [location, setLocation] = useLocation()
  const { locale } = useI18n()
  const href = withLocalePrefix(`/services#${id}`, locale)

  return (
    <a
      href={href}
      className="hover:text-white transition-colors cursor-pointer"
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0)
          return
        e.preventDefault()
        if (location === '/services') {
          history.replaceState(null, '', href)
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
          return
        }
        requestSectionScroll(id)
        setLocation('/services')
      }}
    >
      {children}
    </a>
  )
}

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
                <FooterServiceLink id="strategy">{m.footer.discovery}</FooterServiceLink>
              </li>
              <li>
                <FooterServiceLink id="poc">{m.footer.poc}</FooterServiceLink>
              </li>
              <li>
                <FooterServiceLink id="implementation">{m.footer.implementation}</FooterServiceLink>
              </li>
              <li>
                <FooterServiceLink id="maintenance">{m.footer.support}</FooterServiceLink>
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
                <Link href="/careers" className="hover:text-white transition-colors">
                  {m.footer.careers}
                </Link>
              </li>
              <li>
                <Link href="/payment" className="hover:text-white transition-colors">
                  {m.footer.payment}
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-white transition-colors">
                  {m.nav.portfolio}
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
