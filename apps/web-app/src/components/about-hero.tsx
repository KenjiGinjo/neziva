import { Breadcrumb } from './breadcrumb'

export function AboutHero() {
  return (
    <section className="pt-32 pb-16 bg-gradient-to-br from-blue-50 via-purple-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'About' }]} className="mb-6" />
        <div className="max-w-4xl">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">About Neziva</h1>
          <p className="text-2xl text-gray-600 leading-relaxed">
            AI consulting and full-stack development - We build working solutions that integrate seamlessly into your business processes.
          </p>
        </div>
      </div>
    </section>
  )
}
