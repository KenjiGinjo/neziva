import { CheckCircle2, Code, ListTodo, TrendingUp } from 'lucide-react'

export function AboutWhyDifferent() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">Why We're Different</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're not typical consultants. Here's what sets us apart from other AI consulting firms.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-sm hover:-translate-y-1 transition-all">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
              <Code className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">We Write Code</h3>
            <p className="text-gray-600 leading-relaxed">
              We directly develop systems, not just give recommendations. Code, documentation, and deployment - we handle it all. You get working software, not just a report.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-sm hover:-translate-y-1 transition-all">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mb-6">
              <TrendingUp className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Real Experience</h3>
            <p className="text-gray-600 leading-relaxed">
              We've actually built AI projects and know what works and what doesn't. We've encountered the challenges firsthand and learned from real implementations.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-sm hover:-translate-y-1 transition-all">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center mb-6">
              <ListTodo className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Full Process Involvement</h3>
            <p className="text-gray-600 leading-relaxed">
              From initial discussions to code deployment, we're involved throughout. No handoffs or gaps in communication. One team, start to finish.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-sm hover:-translate-y-1 transition-all">
            <div className="w-16 h-16 bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] rounded-xl flex items-center justify-center mb-6">
              <CheckCircle2 className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Working Systems We Deliver</h3>
            <p className="text-gray-600 leading-relaxed">
              Code, documentation, and deployment - we deliver everything needed for a functioning system. You get a complete, production-ready solution.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
