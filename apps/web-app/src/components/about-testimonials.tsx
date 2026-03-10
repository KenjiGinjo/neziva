import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Michael Chen',
    role: 'CEO, TechStart Inc',
    image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg',
    quote: 'They actually delivered working code, not just recommendations. The chatbot they built handles 60% of our customer inquiries automatically now.',
  },
  {
    name: 'Sarah Johnson',
    role: 'Marketing Director, GrowthCo',
    image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg',
    quote: 'Honest about what was possible and what wasn\'t. The marketing automation system saved us 15 hours per week and the documentation is excellent.',
  },
  {
    name: 'David Rodriguez',
    role: 'Operations Manager, LogiFlow',
    image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg',
    quote: 'They stayed involved from start to finish. No handoffs to other teams. The predictive analytics dashboard they built gives us real insights we can act on.',
  },
]

// ** 暂时不用
export function AboutTestimonials() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">What Clients Say</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real feedback from businesses we've helped integrate AI solutions.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <div key={i} className="bg-gray-50 rounded-2xl p-8 hover:-translate-y-1 transition-all">
              <div className="flex items-center mb-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array.from({ length: 5 })].map((_, j) => (
                  <Star key={j} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed">{testimonial.quote}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
