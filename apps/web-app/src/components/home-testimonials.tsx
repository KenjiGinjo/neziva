import { Star } from 'lucide-react'

export function HomeTestimonials() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real feedback from businesses we've helped transform with AI solutions.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-all">
            <div className="flex items-center mb-6">
              <img
                src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg"
                alt="Client"
                className="w-16 h-16 rounded-full mr-4"
              />
              <div>
                <div className="font-bold text-gray-900">Michael Chen</div>
                <div className="text-sm text-gray-600">CEO, TechStart Inc</div>
              </div>
            </div>
            <div className="flex mb-4">
              {[...Array.from({ length: 5 })].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <p className="text-gray-700 leading-relaxed">
              "Neziva didn't just consult—they built our entire AI system. The team delivered working code that transformed our operations. Highly recommended for anyone serious about AI."
            </p>
          </div>
          <div className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-all">
            <div className="flex items-center mb-6">
              <img
                src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg"
                alt="Client"
                className="w-16 h-16 rounded-full mr-4"
              />
              <div>
                <div className="font-bold text-gray-900">Sarah Johnson</div>
                <div className="text-sm text-gray-600">CTO, DataFlow Solutions</div>
              </div>
            </div>
            <div className="flex mb-4">
              {[...Array.from({ length: 5 })].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <p className="text-gray-700 leading-relaxed">
              "What impressed me most was their full-stack capability. From backend AI models to frontend interfaces, they handled everything. The result exceeded our expectations."
            </p>
          </div>
          <div className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-all">
            <div className="flex items-center mb-6">
              <img
                src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg"
                alt="Client"
                className="w-16 h-16 rounded-full mr-4"
              />
              <div>
                <div className="font-bold text-gray-900">David Martinez</div>
                <div className="text-sm text-gray-600">Founder, InnovateAI</div>
              </div>
            </div>
            <div className="flex mb-4">
              {[...Array.from({ length: 5 })].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <p className="text-gray-700 leading-relaxed">
              "Their POC development service was perfect for validating our concept before full investment. Professional, efficient, and technically excellent."
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
