import { Minus, Plus } from 'lucide-react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

const faqs = [
  {
    question: 'How quickly will you respond?',
    answer: 'We respond to all inquiries within 24 hours on business days (Monday – Friday, UTC+8). For urgent matters, mention it in your subject line.',
  },
  {
    question: 'What information should I include in my message?',
    answer: 'Please describe your project goals, any specific requirements, current challenges, and your timeline. The more details you provide, the better we can understand your needs and prepare a relevant response.',
  },
  {
    question: 'Do you offer free consultations?',
    answer: 'Yes. We offer a free 30-minute discovery call for new inquiries. Use the contact form or email us directly to get started — no commitment required.',
  },
  {
    question: 'What\'s the typical project timeline?',
    answer: 'Timelines vary by project type: Discovery calls are 30 minutes, POC development takes 1–3 weeks, and full implementations range from 1–3 months depending on scope. We\'ll provide a detailed timeline after understanding your requirements.',
  },
  {
    question: 'What types of projects do you take on?',
    answer: 'We build practical AI solutions including chatbots, workflow automation, data analytics tools, content generation systems, and custom AI integrations. If you\'re unsure whether your idea is a fit, reach out — that\'s what the free discovery call is for.',
  },
  {
    question: 'What are your prices?',
    answer: 'Discovery calls are free. POC projects start from $2,000 with early partner pricing for pilot clients. Full implementations are quoted based on scope. Email us with your project details and we\'ll provide a tailored estimate.',
  },
  {
    question: 'Can you work with our existing tech stack?',
    answer: 'Yes. We specialize in integrating AI solutions with existing systems and workflows. Whether you use cloud platforms or on-premise infrastructure, we\'ll design solutions that fit your current setup.',
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
                  <span className="font-semibold text-gray-900 text-lg pr-4">
                    {faq.question}
                  </span>
                  {openIndex === index
                    ? (
                        <Minus className="h-5 w-5 text-[#4F46E5] shrink-0" />
                      )
                    : (
                        <Plus className="h-5 w-5 text-[#4F46E5] shrink-0" />
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
