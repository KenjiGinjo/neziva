import { useEffect } from 'react'
import { Link } from 'wouter'

export function PagePrivacy() {
  useEffect(() => {
    if (window.location.hash === '#cookies') {
      const scroll = () => {
        const el = document.getElementById('cookies')
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
      requestAnimationFrame(() => requestAnimationFrame(scroll))
    }
  }, [])

  return (
    <div className="bg-white text-gray-900 min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-gray-500 text-sm mb-12">
          Last updated:
          {' '}
          {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <div className="prose prose-gray max-w-none space-y-10">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
            <p className="text-gray-600 leading-relaxed">
              Neziva (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy.
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information
              when you visit our website at neziva.com and use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We collect information that you provide directly to us and information collected automatically:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>
                <strong>Contact form data:</strong>
                {' '}
                Name, email address, phone number, company name, project description, and budget range when you submit our contact form
              </li>
              <li>
                <strong>Automatically collected data:</strong>
                {' '}
                IP address, browser type, device information, pages visited, and referring URLs through Google Analytics
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How We Use Your Information</h2>
            <p className="text-gray-600 leading-relaxed mb-4">We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>Respond to your inquiries and provide customer support</li>
              <li>Send you information about our services (with your consent)</li>
              <li>Improve our website and user experience</li>
              <li>Analyze site traffic and usage patterns</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Information Sharing</h2>
            <p className="text-gray-600 leading-relaxed">
              We do not sell your personal information. We may share your information with:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 mt-4">
              <li>
                <strong>Service providers:</strong>
                {' '}
                Google Analytics for website analytics. Google&apos;s privacy policy:
                {' '}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#4F46E5] hover:underline"
                >
                  https://policies.google.com/privacy
                </a>
              </li>
              <li>
                <strong>Legal requirements:</strong>
                {' '}
                When required by law or to protect our rights
              </li>
            </ul>
          </section>

          <section id="cookies">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Cookies and Similar Technologies</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We use cookies and similar technologies to enhance your experience on our website:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>
                <strong>Google Analytics:</strong>
                {' '}
                We use Google Analytics to understand how visitors interact with our site. This service uses cookies to collect information such as pages visited, time on site, and referral sources. You can opt out of Google Analytics by installing the
                {' '}
                <a
                  href="https://tools.google.com/dlpage/gaoptout"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#4F46E5] hover:underline"
                >
                  Google Analytics Opt-out Browser Add-on
                </a>
                .
              </li>
              <li>
                <strong>Essential cookies:</strong>
                {' '}
                May be used for basic site functionality
              </li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-4">
              You can control cookies through your browser settings. Disabling cookies may affect some website features.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Data Retention</h2>
            <p className="text-gray-600 leading-relaxed">
              We retain your contact form submissions for as long as necessary to fulfill the purpose for which they were collected, or as required by law. Analytics data is retained according to Google Analytics&apos; data retention settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Your Rights</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Depending on your location, you may have the right to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to or restrict processing of your data</li>
              <li>Data portability</li>
              <li>Withdraw consent (where processing is based on consent)</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-4">
              To exercise these rights, please contact us at
              {' '}
              <a href="mailto:hello@neziva.com" className="text-[#4F46E5] hover:underline">
                hello@neziva.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Security</h2>
            <p className="text-gray-600 leading-relaxed">
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. International Transfers</h2>
            <p className="text-gray-600 leading-relaxed">
              Your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place for such transfers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Changes to This Policy</h2>
            <p className="text-gray-600 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the &quot;Last updated&quot; date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Contact Us</h2>
            <p className="text-gray-600 leading-relaxed">
              If you have questions about this Privacy Policy, please contact us at
              {' '}
              <a href="mailto:hello@neziva.com" className="text-[#4F46E5] hover:underline">
                hello@neziva.com
              </a>
              .
            </p>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-200">
          <Link href="/" className="text-[#4F46E5] hover:underline font-medium">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
