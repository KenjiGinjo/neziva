import { Link } from 'wouter'

export function ServicesHero() {
  return (
    <section className="pt-32 pb-16 bg-gradient-to-br from-blue-50 via-purple-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-[#4F46E5]">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800 font-medium">Services</span>
        </div>
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Our Services</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            From strategy to implementation, we deliver working AI solutions that solve real business problems. No hype, just practical results.
          </p>
        </div>
      </div>
    </section>
  )
}
