import { PaymentFairness } from '@/components/payment-fairness'
import { PaymentHero } from '@/components/payment-hero'
import { PaymentInfo } from '@/components/payment-info'

export function PagePayment() {
  return (
    <div className="bg-white text-gray-900">
      <PaymentHero />
      <PaymentFairness />
      <PaymentInfo />
    </div>
  )
}
