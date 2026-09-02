import { vContactSubmit } from '@neziva/validations'
import { MessageCircle, Send } from 'lucide-react'
import { useState } from 'react'
import { Form } from '@/components/form'
import { Select as FormSelect } from '@/components/form/select'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useSchemaPatch } from '@/hooks'
import { $qc } from '@/query-client'

export function ContactFloating() {
  const [open, setOpen] = useState(false)
  const { form, dto, patch } = useSchemaPatch(vContactSubmit, {
    name: '',
    company: '',
    email: '',
    phone: '',
    projectType: '',
    description: '',
    budget: '',
  })

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-full shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 hover:scale-105 active:scale-95 transition-all flex items-center justify-center"
        aria-label="Contact us"
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto scrollbar-hide p-0 gap-0 rounded-2xl border-0 shadow-2xl [&_[data-slot=dialog-close]]:text-white [&_[data-slot=dialog-close]]:hover:text-white [&_[data-slot=dialog-close]]:opacity-80 [&_[data-slot=dialog-close]]:hover:opacity-100">
          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 px-6 py-8 rounded-t-2xl">
            <DialogHeader className="p-0">
              <DialogTitle className="text-2xl font-bold text-white">
                Get In Touch
              </DialogTitle>
              <p className="text-indigo-100 text-sm mt-1">
                We typically respond within 12 hours
              </p>
            </DialogHeader>
          </div>

          <div className="p-6">
            <Form.Form form={form} onChange={v => patch(v)} className="space-y-5">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Contact</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Form.Input
                    name="name"
                    label="Full Name"
                    placeholder="John Doe"
                    required
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
                  />
                  <Form.Input
                    name="email"
                    type="email"
                    label="Email"
                    placeholder="john@example.com"
                    required
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
                  />
                  <Form.Input
                    name="company"
                    label="Company"
                    desc="(Optional)"
                    placeholder="Your Company"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition sm:col-span-2"
                  />
                  <Form.Input
                    name="phone"
                    type="tel"
                    label="Phone"
                    desc="(Optional)"
                    placeholder="+1 (555) 123-4567"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition sm:col-span-2"
                  />
                </div>
              </div>

              <div className="border-t border-gray-100 pt-5">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Project</p>
                <div className="space-y-4">
                  <FormSelect
                    name="projectType"
                    label="Service Interested In"
                    placeholder="Select a service"
                    options={[
                      { value: 'strategy', label: 'Discovery Call (Free)' },
                      { value: 'poc', label: 'AI POC Development' },
                      { value: 'implementation', label: 'Full Implementation' },
                      { value: 'maintenance', label: 'Post-Project Support' },
                      { value: 'other', label: 'Not Sure Yet' },
                    ]}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
                  />
                  <FormSelect
                    name="budget"
                    label="Budget Range"
                    desc="(Optional)"
                    placeholder="Select budget range"
                    options={[
                      { value: 'under2k', label: 'Under $2,000' },
                      { value: '2k-8k', label: '$2,000 - $8,000' },
                      { value: '8k-25k', label: '$8,000 - $25,000' },
                      { value: '25k+', label: '$25,000+' },
                      { value: 'not-say', label: 'Prefer not to say' },
                    ]}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
                  />
                  <Form.Textarea
                    name="description"
                    label="Message"
                    placeholder="Tell us about your project..."
                    rows={4}
                    required
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition resize-none"
                  />
                </div>
              </div>

              <Form.Submit
                form={form}
                request={() => $qc.contact.submit.$post.mutation({ body: dto })}
                onSuccess={() => {
                  form.reset()
                  setOpen(false)
                }}
              >
                <Button
                  type="button"
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3.5 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2"
                >
                  <Send className="h-5 w-5" />
                  Send Message
                </Button>
              </Form.Submit>
            </Form.Form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
