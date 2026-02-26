import { Award, Clock, RefreshCw, Shield } from 'lucide-react'

export function HomeAbout() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">About Neziva</h2>
            <p className="text-xl text-gray-700 mb-6 leading-relaxed">
              We're a team of AI engineers and full-stack developers who believe in building real solutions, not just providing advice.
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Our approach is simple: understand your business needs, design the right AI solution, write clean code, and deliver a working system. We've worked on projects ranging from small POCs to enterprise-scale implementations.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              What sets us apart is our hands-on development capability. We don't outsource the technical work—we build it ourselves, ensuring quality and maintaining direct communication throughout the project.
            </p>
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-[#4F46E5] mb-2">50+</div>
                <div className="text-gray-600">Projects Delivered</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#7C3AED] mb-2">98%</div>
                <div className="text-gray-600">Client Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#10B981] mb-2">24/7</div>
                <div className="text-gray-600">Support Available</div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] rounded-xl p-8 text-white">
              <Award className="h-10 w-10 mb-4" />
              <h3 className="text-xl font-bold mb-2">Quality Driven</h3>
              <p className="text-sm opacity-90">Every line of code meets our high standards</p>
            </div>
            <div className="bg-gradient-to-br from-[#10B981] to-teal-500 rounded-xl p-8 text-white mt-8">
              <Clock className="h-10 w-10 mb-4" />
              <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
              <p className="text-sm opacity-90">Agile methodology for quick iterations</p>
            </div>
            <div className="bg-gradient-to-br from-[#F97316] to-red-500 rounded-xl p-8 text-white">
              <Shield className="h-10 w-10 mb-4" />
              <h3 className="text-xl font-bold mb-2">Secure</h3>
              <p className="text-sm opacity-90">Enterprise-grade security standards</p>
            </div>
            <div className="bg-gradient-to-br from-[#7C3AED] to-[#10B981] rounded-xl p-8 text-white mt-8">
              <RefreshCw className="h-10 w-10 mb-4" />
              <h3 className="text-xl font-bold mb-2">Scalable</h3>
              <p className="text-sm opacity-90">Built to grow with your business</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
