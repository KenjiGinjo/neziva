import { Breadcrumb } from './breadcrumb'

export function ServicesHero() {
  return (
    <section className="pt-32 pb-16 bg-gradient-to-br from-blue-50 via-purple-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Services' }]} className="mb-6" />
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Our Services</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            From discovery to deployment, we deliver working AI solutions. Transparent pricing — no hidden fees.
          </p>
        </div>
      </div>
    </section>
  )
}
