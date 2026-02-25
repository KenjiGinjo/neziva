import { vContactSubmit } from '@neziva/validations'
import { Calendar, Clock, Mail, Send } from 'lucide-react'
import { Link } from 'wouter'
import { Form } from '@/components/form'
import { Select as FormSelect } from '@/components/form/select'
import { Button } from '@/components/ui/button'
import { useSchemaPatch } from '@/hooks'
import { $qc } from '@/query-client'

export function HomeContact() {
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
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Get In Touch</h2>
          <p className="text-xl text-gray-600">
            Have a question or ready to start a project? We'd love to hear from you.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
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
                  placeholder="Your Company"
                  className="w-full border-2 border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#4F46E5] transition"
                />
                <Form.Input
                  name="phone"
                  type="tel"
                  label="Phone"
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
                onSuccess={() => form.reset()}
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
          </div>
          <div className="space-y-8">
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
                <span>Monday - Friday, 9:00 AM - 6:00 PM EST</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
