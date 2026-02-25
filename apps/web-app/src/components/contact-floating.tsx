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
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-[#4F46E5] text-white rounded-full shadow-lg hover:bg-indigo-600 hover:scale-110 transition-all flex items-center justify-center"
        aria-label="Contact us"
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Get In Touch</DialogTitle>
          </DialogHeader>
          <Form.Form form={form} onChange={v => patch(v)} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Form.Input
                name="name"
                label="Full Name"
                placeholder="John Doe"
                required
                className="w-full border-2 border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#4F46E5] transition"
              />
              <Form.Input
                name="email"
                type="email"
                label="Email Address"
                placeholder="john@example.com"
                required
                className="w-full border-2 border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#4F46E5] transition"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Form.Input
                name="company"
                label="Company"
                desc="(Optional)"
                placeholder="Your Company"
                className="w-full border-2 border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#4F46E5] transition"
              />
              <Form.Input
                name="phone"
                type="tel"
                label="Phone"
                desc="(Optional)"
                placeholder="+1 (555) 123-4567"
                className="w-full border-2 border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#4F46E5] transition"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <FormSelect
                name="projectType"
                label="Service Interested In"
                placeholder="Select a service"
                options={[
                  { value: 'strategy', label: 'AI Strategy Workshop' },
                  { value: 'poc', label: 'AI POC Development' },
                  { value: 'implementation', label: 'Full Implementation' },
                  { value: 'maintenance', label: 'Optimization & Maintenance' },
                  { value: 'other', label: 'Not Sure Yet' },
                ]}
                className="w-full border-2 border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#4F46E5] transition"
              />
              <FormSelect
                name="budget"
                label="Budget Range"
                desc="(Optional)"
                placeholder="Select budget range (optional)"
                options={[
                  { value: 'under5k', label: 'Under $5,000' },
                  { value: '5k-15k', label: '$5,000 - $15,000' },
                  { value: '15k-50k', label: '$15,000 - $50,000' },
                  { value: '50k+', label: '$50,000+' },
                  { value: 'not-say', label: 'Prefer not to say' },
                ]}
                className="w-full border-2 border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#4F46E5] transition"
              />
            </div>
            <Form.Textarea
              name="description"
              label="Message"
              placeholder="Tell us about your project..."
              rows={3}
              required
              className="w-full border-2 border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#4F46E5] transition resize-none"
            />
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
                className="w-full bg-[#4F46E5] text-white py-3 rounded-lg font-bold text-lg hover:bg-blue-700 transition flex items-center justify-center"
              >
                <Send className="h-5 w-5 mr-2" />
                Send Message
              </Button>
            </Form.Submit>
          </Form.Form>
        </DialogContent>
      </Dialog>
    </>
  )
}
