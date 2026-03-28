import { Breadcrumb } from './breadcrumb'

export function ContactHero() {
  return (
    <section className="pt-32 pb-16 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-6">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Contact' }]} className="mb-4" />
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Let's Talk About Your AI Project
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl">
          Schedule a free consultation to discuss how AI can transform your business and bring your ideas to life
        </p>
      </div>
    </section>
  )
}
