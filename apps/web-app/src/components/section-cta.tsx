import { ArrowLeft, CheckCircle, Mail, MessageSquare } from 'lucide-react'
import { Link } from 'wouter'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/i18n'

const CONTACT_EMAIL = 'kenjiginjo@gmail.com'

type CTAVariant = 'home' | 'portfolio' | 'blog' | 'about' | 'contact' | 'services'

interface SectionCTAProps {
  variant: CTAVariant
}

export function SectionCTA({ variant }: SectionCTAProps) {
  const { m } = useI18n()
  const cta = m.cta

  const preset = {
    home: {
      title: cta.homeTitle,
      description: cta.homeDescription,
      features: cta.homeFeatures,
      footerText: undefined as string | undefined,
      showSecondaryButton: false,
      secondaryAsLink: false,
      gradient: 'from-[#4F46E5] to-[#7C3AED]',
      compact: false,
    },
    portfolio: {
      title: cta.portfolioTitle,
      description: cta.portfolioDescription,
      features: cta.portfolioFeatures,
      footerText: undefined as string | undefined,
      showSecondaryButton: true,
      secondaryAsLink: true,
      gradient: 'from-[#4F46E5] to-[#7C3AED]',
      compact: false,
    },
    blog: {
      title: cta.blogTitle,
      description: cta.blogDescription,
      features: cta.blogFeatures,
      footerText: undefined as string | undefined,
      showSecondaryButton: true,
      secondaryAsLink: false,
      gradient: 'from-[#4F46E5] via-[#7C3AED] to-[#4F46E5]',
      compact: false,
    },
    about: {
      title: cta.aboutTitle,
      description: cta.aboutDescription,
      features: undefined as string[] | undefined,
      footerText: cta.aboutFooter,
      showSecondaryButton: true,
      secondaryAsLink: false,
      gradient: 'from-[#4F46E5] to-[#7C3AED]',
      compact: false,
    },
    contact: {
      title: cta.contactTitle,
      description: cta.contactDescription,
      features: undefined as string[] | undefined,
      footerText: undefined as string | undefined,
      showSecondaryButton: true,
      secondaryAsLink: false,
      gradient: 'from-[#4F46E5] to-[#7C3AED]',
      compact: true,
    },
    services: {
      title: cta.servicesTitle,
      description: cta.servicesDescription,
      features: undefined as string[] | undefined,
      footerText: cta.servicesFooter,
      showSecondaryButton: false,
      secondaryAsLink: false,
      gradient: 'from-[#4F46E5] via-[#7C3AED] to-[#10B981]',
      compact: true,
    },
  }[variant]

  const hasBlur = variant === 'home' || variant === 'portfolio'
  const hasIcon = variant === 'blog'

  return (
    <section className={`${preset.compact ? 'py-20' : 'py-24'} bg-gradient-to-br ${preset.gradient} text-white relative overflow-hidden`}>
      {hasBlur && (
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
      )}

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        {hasIcon && (
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-8">
            <MessageSquare className="h-10 w-10 text-white" />
          </div>
        )}

        <h2 className="text-4xl md:text-5xl font-bold mb-6">{preset.title}</h2>
        <p className={`text-xl mb-10 max-w-2xl mx-auto ${variant === 'about' ? 'text-blue-100' : 'text-white/90'}`}>
          {preset.description}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <a href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(cta.mailSubject)}`}>
            <Button className="bg-white text-[#4F46E5] px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl transform hover:scale-105">
              <Mail className="mr-2 h-5 w-5" />
              {m.common.contactUs}
            </Button>
          </a>

          {preset.showSecondaryButton && (
            preset.secondaryAsLink
              ? (
                  <Link href="/services" className="text-white font-semibold text-lg hover:underline flex items-center">
                    {m.common.viewServices}
                    <ArrowLeft className="h-5 w-5 ml-2 rotate-180" />
                  </Link>
                )
              : (
                  <Link href="/services">
                    <Button
                      variant="outline"
                      className="bg-transparent border-2 border-white text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-[#4F46E5] transition-all"
                    >
                      {m.common.viewServices}
                    </Button>
                  </Link>
                )
          )}
        </div>

        {preset.features && preset.features.length > 0 && (
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-white/80">
            {preset.features.map(f => (
              <div key={f} className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 shrink-0" />
                <span>{f}</span>
              </div>
            ))}
          </div>
        )}

        {preset.footerText && (
          <p className={`mt-8 text-lg ${variant === 'about' ? 'text-blue-200' : 'text-white/80'}`}>
            {preset.footerText}
          </p>
        )}
      </div>
    </section>
  )
}
