import { Minus, Plus } from 'lucide-react'
import { useState } from 'react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { useI18n } from '@/i18n'

export function ContactFaq({
  openIndex: openIndexProp,
  onOpenChange,
}: {
  openIndex?: number | null
  onOpenChange?: (index: number | null) => void
}) {
  const { m } = useI18n()
  const [internalOpen, setInternalOpen] = useState<number | null>(null)
  const openIndex = openIndexProp !== undefined ? openIndexProp : internalOpen
  const setOpen = onOpenChange ?? setInternalOpen

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          {m.contact.faqTitle}
        </h2>

        <div className="space-y-4">
          {m.contact.faqs.map((faq, index) => (
            <Collapsible
              key={faq.question}
              open={openIndex === index}
              onOpenChange={open => setOpen(open ? index : null)}
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
