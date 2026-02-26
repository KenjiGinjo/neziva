import { Link } from 'wouter'
import { Button } from '@/components/ui/button'

export function ServicesCTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#4F46E5] via-[#7C3AED] to-pink-500">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Not Sure Which Service You Need?
        </h2>
        <p className="text-xl text-white/90 mb-8">
          Schedule a free consultation and we'll help you choose the right solution for your business
        </p>
        <Link href="/contact">
          <Button className="bg-white text-[#4F46E5] px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all">
            Schedule Free Consultation
          </Button>
        </Link>
        <p className="text-white/80 mt-6">No commitment required • 30-minute session • Expert guidance</p>
      </div>
    </section>
  )
}
