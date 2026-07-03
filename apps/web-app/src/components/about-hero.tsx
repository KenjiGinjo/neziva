import { Breadcrumb } from './breadcrumb'

export function AboutHero() {
  return (
    <section className="pt-32 pb-16 bg-gradient-to-br from-blue-50 via-purple-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'About' }]} className="mb-6" />
        <div className="max-w-4xl">
          <p className="text-[#4F46E5] font-medium mb-4">AI Development Studio · Registered in China</p>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">About Neziva</h1>
          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
            We build working AI systems — from requirements to production-ready code.
            A new studio with real engineering capability, currently accepting our first pilot clients.
          </p>
        </div>
      </div>
    </section>
  )
}
