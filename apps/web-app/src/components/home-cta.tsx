import { Calendar, CheckCircle } from 'lucide-react'
import { Link } from 'wouter'
import { Button } from '@/components/ui/button'

export function HomeCTA() {
  return (
    <section className="py-24 bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>
      <div className="max-w-4xl mx-auto px-6 text-center relative">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Ready to Build Something Together?
        </h2>
        <p className="text-2xl mb-4 text-purple-100">
          Let's discuss how AI can help your business
        </p>
        <p className="text-lg mb-12 text-purple-100 max-w-2xl mx-auto">
          Schedule a free consultation to explore AI opportunities. No commitment required—just an honest conversation about what's possible.
        </p>
        <Link href="/contact">
          <Button className="bg-white text-[#4F46E5] px-10 py-4 rounded-lg font-bold text-xl hover:bg-gray-100 transition transform hover:scale-105">
            Schedule Free Consultation
            <Calendar className="ml-2 h-5 w-5" />
          </Button>
        </Link>
        <div className="mt-12 flex flex-wrap justify-center gap-8 text-purple-100">
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 mr-2" />
            <span>No commitment required</span>
          </div>
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 mr-2" />
            <span>30-minute call</span>
          </div>
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 mr-2" />
            <span>Actionable insights</span>
          </div>
        </div>
      </div>
    </section>
  )
}
