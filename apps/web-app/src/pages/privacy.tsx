import { useEffect } from 'react'
import { Link } from 'wouter'
import { formatDate, useI18n } from '@/i18n'

export function PagePrivacy() {
  const { m, locale } = useI18n()
  const p = m.privacy

  useEffect(() => {
    if (window.location.hash === '#cookies') {
      const scroll = () => {
        const el = document.getElementById('cookies')
        if (el)
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
      requestAnimationFrame(() => requestAnimationFrame(scroll))
    }
  }, [])

  return (
    <div className="bg-white text-gray-900 min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{p.title}</h1>
        <p className="text-gray-500 text-sm mb-12">
          {p.lastUpdated}
          {' '}
          {formatDate(new Date().toISOString(), locale)}
        </p>

        <div className="prose prose-gray max-w-none space-y-10">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">{p.s1Title}</h2>
            <p className="text-gray-600 leading-relaxed">{p.s1Body}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">{p.s2Title}</h2>
            <p className="text-gray-600 leading-relaxed mb-4">{p.s2Intro}</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>
                <strong>{p.s2Contact}</strong>
                {' '}
                {p.s2ContactBody}
              </li>
              <li>
                <strong>{p.s2Auto}</strong>
                {' '}
                {p.s2AutoBody}
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">{p.s3Title}</h2>
            <p className="text-gray-600 leading-relaxed mb-4">{p.s3Intro}</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              {p.s3Items.map(item => <li key={item}>{item}</li>)}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">{p.s4Title}</h2>
            <p className="text-gray-600 leading-relaxed">{p.s4Intro}</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 mt-4">
              <li>
                <strong>{p.s4Providers}</strong>
                {' '}
                {p.s4ProvidersBody}
                {' '}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#4F46E5] hover:underline">
                  https://policies.google.com/privacy
                </a>
              </li>
              <li>
                <strong>{p.s4Legal}</strong>
                {' '}
                {p.s4LegalBody}
              </li>
            </ul>
          </section>

          <section id="cookies">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">{p.s5Title}</h2>
            <p className="text-gray-600 leading-relaxed mb-4">{p.s5Intro}</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>
                <strong>{p.s5Ga}</strong>
                {' '}
                {p.s5GaBefore}
                {' '}
                <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-[#4F46E5] hover:underline">
                  {p.s5GaLink}
                </a>
                {p.s5GaAfter}
              </li>
              <li>
                <strong>{p.s5Essential}</strong>
                {' '}
                {p.s5EssentialBody}
              </li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-4">{p.s5Control}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">{p.s6Title}</h2>
            <p className="text-gray-600 leading-relaxed">{p.s6Body}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">{p.s7Title}</h2>
            <p className="text-gray-600 leading-relaxed mb-4">{p.s7Intro}</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              {p.s7Items.map(item => <li key={item}>{item}</li>)}
            </ul>
            <p className="text-gray-600 leading-relaxed mt-4">
              {p.s7Contact}
              {' '}
              <a href="mailto:kenjiginjo@gmail.com" className="text-[#4F46E5] hover:underline">
                kenjiginjo@gmail.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">{p.s8Title}</h2>
            <p className="text-gray-600 leading-relaxed">{p.s8Body}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">{p.s9Title}</h2>
            <p className="text-gray-600 leading-relaxed">{p.s9Body}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">{p.s10Title}</h2>
            <p className="text-gray-600 leading-relaxed">{p.s10Body}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">{p.s11Title}</h2>
            <p className="text-gray-600 leading-relaxed">
              {p.s11Body}
              {' '}
              <a href="mailto:kenjiginjo@gmail.com" className="text-[#4F46E5] hover:underline">
                kenjiginjo@gmail.com
              </a>
              .
            </p>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-200">
          <Link href="/" className="text-[#4F46E5] hover:underline font-medium">
            {p.back}
          </Link>
        </div>
      </div>
    </div>
  )
}
