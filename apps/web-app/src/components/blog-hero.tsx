import { Breadcrumb } from './breadcrumb'

export function BlogHero() {
  return (
    <section className="pt-32 pb-16 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-6">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Blog' }]} className="mb-6" />
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] bg-clip-text text-transparent">
            Insights & Resources
          </h1>
          <p className="text-xl text-gray-600">
            AI trends, technical insights, and practical guides to help you leverage AI for your business success
          </p>
        </div>
      </div>
    </section>
  )
}
