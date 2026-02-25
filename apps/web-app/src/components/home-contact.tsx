import { Calendar, Clock, Mail } from 'lucide-react'
import { Link } from 'wouter'
import { ContactFloating } from '@/components/contact-floating'

export function HomeContact() {
  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Get In Touch</h2>
          <p className="text-xl text-gray-600">
            Have a question or ready to start a project? We'd love to hear from you.
          </p>
        </div>
        <div className="max-w-2xl mx-auto space-y-8">
            <div className="bg-gray-50 rounded-xl p-8">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-[#4F46E5] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <h3 className="font-bold text-gray-900 text-lg mb-2">Email Us</h3>
                  <p className="text-gray-600 mb-2">
                    For general inquiries and project discussions
                  </p>
                  <a href="mailto:hello@neziva.com" className="text-[#4F46E5] font-semibold">
                    hello@neziva.com
                  </a>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-8">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-[#10B981] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <h3 className="font-bold text-gray-900 text-lg mb-2">Book a Call</h3>
                  <p className="text-gray-600 mb-2">Schedule a free 30-minute consultation</p>
                  <Link href="/contact" className="text-[#10B981] font-semibold hover:underline">
                    calendly.com/neziva
                  </Link>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] rounded-xl p-8 text-white">
              <h3 className="font-bold text-xl mb-3">Response Time</h3>
              <p className="text-purple-100 mb-4">
                We typically respond within 24 hours on business days. For urgent matters, please mention it in your message.
              </p>
              <div className="flex items-center text-sm">
                <Clock className="h-4 w-4 mr-2" />
                <span>Monday - Friday, 9:00 AM - 6:00 PM (Beijing Time)</span>
              </div>
            </div>
        </div>
      </div>

      <ContactFloating />
    </section>
  )
}
