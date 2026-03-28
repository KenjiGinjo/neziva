import { Minus, Plus } from 'lucide-react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

const faqs = [
  {
    question: 'How quickly will you respond?',
    answer: 'We respond to all inquiries within 24 hours. If you schedule a call via Calendly, we\'ll respond within 15 minutes to confirm and prepare for your consultation.',
  },
  {
    question: 'What information should I include in my message?',
    answer: 'Please describe your project goals, any specific requirements, current challenges, and your timeline. The more details you provide, the better we can understand your needs and provide relevant recommendations during our initial consultation.',
  },
  {
    question: 'Do you offer free consultations?',
    answer: 'Yes, we offer free initial consultations to discuss your needs, understand your business challenges, and determine if we\'re a good fit for your project. This typically lasts 30-45 minutes and includes a preliminary assessment of your AI opportunities.',
  },
  {
    question: 'What\'s the typical project timeline?',
    answer: 'Timelines vary by project type: Strategy workshops are typically 2-4 hours, POC development takes 1-3 weeks, full implementations range from 1-3 months, and ongoing maintenance is customized to your needs. We\'ll provide a detailed timeline during our initial consultation.',
  },
  {
    question: 'What industries do you work with?',
    answer: 'We work across various industries including healthcare, finance, e-commerce, manufacturing, and professional services. Our approach is industry-agnostic, focusing on understanding your specific business processes and challenges to deliver tailored AI solutions.',
  },
  {
    question: 'Can you work with our existing tech stack?',
    answer: 'Absolutely. We specialize in integrating AI solutions with existing systems and workflows. Whether you\'re using cloud platforms, on-premise infrastructure, or legacy systems, we\'ll design solutions that work seamlessly with your current technology stack.',
  },
]

export function ContactFaq({ openIndex, onOpenChange }: { openIndex: number | null; onOpenChange: (index: number | null) => void }) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Collapsible
              key={index}
              open={openIndex === index}
              onOpenChange={open => onOpenChange(open ? index : null)}
            >
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <CollapsibleTrigger className="w-full px-6 py-5 text-left flex items-center justify-between bg-white hover:bg-gray-50 transition">
                  <span className="font-semibold text-gray-900 text-lg">
                    {faq.question}
                  </span>
                  {openIndex === index
                    ? (
                        <Minus className="h-5 w-5 text-[#4F46E5]" />
                      )
                    : (
                        <Plus className="h-5 w-5 text-[#4F46E5]" />
                      )}
                </CollapsibleTrigger>
                <CollapsibleContent className="px-6 pb-5 bg-gray-50">
                  <p className="text-gray-700 leading-relaxed pt-2">{faq.answer}</p>
                </CollapsibleContent>
              </div>
            </Collapsible>
          ))}
        </div>
      </div>
    </section>
  )
}
