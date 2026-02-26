export function HomeProcess() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Process</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From initial consultation to deployment, we follow a proven methodology that ensures success.
          </p>
        </div>
        <div className="grid md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl font-bold text-white">1</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Discovery</h3>
            <p className="text-gray-600">
              We analyze your business needs and identify AI opportunities that deliver real value.
            </p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-[#7C3AED] to-[#10B981] rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl font-bold text-white">2</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Design</h3>
            <p className="text-gray-600">
              We architect the solution, plan the implementation, and define success metrics.
            </p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-[#F97316] to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl font-bold text-white">3</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Development</h3>
            <p className="text-gray-600">
              We build the AI system with clean code, thorough testing, and regular updates.
            </p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-[#10B981] to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl font-bold text-white">4</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Deployment</h3>
            <p className="text-gray-600">
              We launch your AI solution and provide ongoing support to ensure optimal performance.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
