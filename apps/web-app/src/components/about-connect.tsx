import { Calendar, Mail } from 'lucide-react'
import { Link } from 'wouter'

export function AboutConnect() {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-6">Let's Connect</h2>
          <p className="text-2xl text-gray-300 max-w-3xl mx-auto">
            Ready to discuss your AI project? Choose the way that works best for you.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-10 max-w-4xl mx-auto">
          <a
            href="mailto:hello@neziva.com"
            className="bg-white rounded-2xl p-12 min-w-[320px] max-w-[380px] hover:-translate-y-1 transition-all text-center group"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform">
              <Mail className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Email Us</h3>
            <p className="text-[#4F46E5] font-semibold text-lg mb-2">hello@neziva.com</p>
            <p className="text-gray-600">We respond within 24 hours</p>
          </a>
          <Link
            href="/contact"
            className="bg-white rounded-2xl p-12 min-w-[320px] max-w-[380px] hover:-translate-y-1 transition-all text-center group"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-[#F97316] to-red-600 rounded-xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform">
              <Calendar className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Schedule a Call</h3>
            <p className="text-[#F97316] font-semibold text-lg mb-2">Book directly</p>
            <p className="text-gray-600">30-minute consultation call</p>
          </Link>
        </div>
      </div>
    </section>
  )
}
