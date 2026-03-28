import type { vContactSubmit } from '@neziva/validations'
import type { FieldValues, UseFormReturn } from 'react-hook-form'
import { Calendar, CheckCircle, Send } from 'lucide-react'
import { Link } from 'wouter'
import { Form } from '@/components/form'
import { Select as FormSelect } from '@/components/form/select'
import { Button } from '@/components/ui/button'
import { $qc } from '@/query-client'

type ContactMainProps<T extends FieldValues> = {
  form: UseFormReturn<T>
  dto: vContactSubmit
  patch: (v: Partial<vContactSubmit>) => void
  submitSuccess: boolean
  setSubmitSuccess: (v: boolean) => void
}

export function ContactMain<T extends FieldValues>({
  form,
  dto,
  patch,
  submitSuccess,
  setSubmitSuccess,
}: ContactMainProps<T>) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Send Us a Message</h2>
              <p className="text-gray-600 mb-8">
                Fill out the form below and we'll get back to you within 24 hours
              </p>

              {submitSuccess
                ? (
                    <div className="bg-green-50 border border-green-200 text-green-800 px-6 py-4 rounded-lg flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      <span>Thank you! We'll get back to you within 24 hours.</span>
                    </div>
                  )
                : (
                    <Form.Form form={form} onChange={v => patch(v)} className="space-y-3">
                      <Form.Input
                        name="name"
                        label="Name"
                        placeholder="Your name"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent transition"
                      />

                      <Form.Input
                        name="company"
                        label="Company Name"
                        desc="(optional)"
                        placeholder="Your company (optional)"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent transition"
                      />

                      <Form.Input
                        name="email"
                        type="email"
                        label="Email"
                        placeholder="your.email@example.com"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent transition"
                      />

                      <Form.Input
                        name="phone"
                        type="tel"
                        label="Phone"
                        desc="(optional)"
                        placeholder="+1 (555) 123-4567"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent transition"
                      />

                      <FormSelect
                        name="projectType"
                        label="Project Type"
                        placeholder="Select a project type"
                        options={[
                          { value: 'strategy', label: 'Strategy Workshop' },
                          { value: 'poc', label: 'POC Development' },
                          { value: 'implementation', label: 'Full Implementation' },
                          { value: 'maintenance', label: 'Maintenance & Optimization' },
                          { value: 'other', label: 'Not Sure / Other' },
                        ]}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent transition"
                      />

                      <div>
                        <Form.Textarea
                          name="description"
                          label="Project Description"
                          placeholder="Describe your project, goals, and any specific requirements..."
                          rows={5}
                          maxLength={1000}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent transition resize-none"
                        />
                        <div className="text-right text-gray-400 text-xs mt-1">
                          {(form.watch('description' as any) as string)?.length || 0}
                          {' '}
                          / 1000
                        </div>
                      </div>

                      <FormSelect
                        name="budget"
                        label="Budget Range"
                        desc="(optional)"
                        placeholder="Select budget range (optional)"
                        options={[
                          { value: 'under5k', label: 'Under $5,000' },
                          { value: '5k-15k', label: '$5,000 - $15,000' },
                          { value: '15k-50k', label: '$15,000 - $50,000' },
                          { value: '50k+', label: '$50,000+' },
                          { value: 'not-say', label: 'Prefer not to say' },
                        ]}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent transition"
                      />

                      <Form.Submit
                        form={form}
                        request={() => $qc.contact.submit.$post.mutation({ body: dto })}
                        onSuccess={() => {
                          setSubmitSuccess(true)
                          form.reset()
                        }}
                      >
                        <Button
                          type="submit"
                          className="w-full bg-[#F97316] hover:bg-orange-600 text-white font-semibold py-4 rounded-lg transition flex items-center justify-center"
                        >
                          <Send className="h-5 w-5 mr-2" />
                          Send Message
                        </Button>
                      </Form.Submit>

                      <div className="text-center mt-4">
                        <p className="text-sm text-gray-500">
                          We'll never share your information.
                          {' '}
                          <Link href="/privacy" className="text-[#4F46E5] hover:underline">Privacy Policy</Link>
                        </p>
                        <p className="text-sm text-gray-600 font-medium mt-2">
                          We'll respond within 24 hours
                        </p>
                      </div>
                    </Form.Form>
                  )}
            </div>
          </div>

          <div>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border border-gray-200 p-8 h-full">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Or Schedule a Call Directly
              </h2>
              <p className="text-gray-600 mb-6">
                Choose a time that works for you. We'll respond within 15 minutes after you book.
              </p>

              <div className="bg-white rounded-xl p-6 mb-6">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Choose your preferred time slot</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">15-minute response guarantee</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">No back-and-forth emails needed</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl h-[600px] flex items-center justify-center border-2 border-dashed border-gray-300">
                <div className="text-center p-8">
                  <Calendar className="h-16 w-16 text-[#4F46E5] mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Calendly Integration
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Embedded Calendly widget would appear here
                  </p>
                  <Button className="bg-[#4F46E5] text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition font-semibold">
                    Schedule on Calendly
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
