import { Breadcrumb } from './breadcrumb'

export function ContactHero() {
  return (
    <section className="pt-32 pb-16 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-6">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Contact' }]} className="mb-4" />
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Get In Touch
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl">
          Tell us about your project via the form below, or email us directly.
          We offer a free 30-minute discovery call for new inquiries.
        </p>
      </div>
    </section>
  )
}
