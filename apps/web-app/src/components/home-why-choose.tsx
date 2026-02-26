import { Code, HandHeart, Layers, Rocket } from 'lucide-react'

export function HomeWhyChoose() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Neziva?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We don't just talk about AI—we build it. Here's what makes us different from traditional consultants.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] rounded-xl flex items-center justify-center mb-6">
              <Code className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Code, Not Just Advice</h3>
            <p className="text-gray-600 leading-relaxed">
              We write working code and build systems, not just give recommendations. Every project includes actual implementation.
            </p>
          </div>
          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-br from-[#7C3AED] to-[#10B981] rounded-xl flex items-center justify-center mb-6">
              <Layers className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Full-Stack Capability</h3>
            <p className="text-gray-600 leading-relaxed">
              From requirements to deployment, we handle the entire process. Frontend, backend, AI integration—we do it all.
            </p>
          </div>
          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-br from-[#F97316] to-red-500 rounded-xl flex items-center justify-center mb-6">
              <Rocket className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Real Solutions</h3>
            <p className="text-gray-600 leading-relaxed">
              We deliver actual working systems, not theoretical concepts. Your AI solution will be production-ready and scalable.
            </p>
          </div>
          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-br from-[#10B981] to-teal-500 rounded-xl flex items-center justify-center mb-6">
              <HandHeart className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Hands-On Experience</h3>
            <p className="text-gray-600 leading-relaxed">
              We've built AI projects and know what works. Our experience comes from real implementation, not just theory.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
