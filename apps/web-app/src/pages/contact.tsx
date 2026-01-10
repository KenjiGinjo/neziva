import { zodResolver } from '@hookform/resolvers/zod'
import {
  Calendar,
  CheckCircle,
  Clock,
  Globe,
  Mail,
  MapPin,
  Minus,
  Plus,
  Send,
} from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Link } from 'wouter'
import { z } from 'zod'
import { FooterMarketing } from '@/components/footer/marketing'
import { Form } from '@/components/form'
import { Input } from '@/components/form/input'
import { Select as FormSelect } from '@/components/form/select'
import { Textarea } from '@/components/form/textarea'
import { HeaderMarketing } from '@/components/header/marketing'
import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

const contactFormSchema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  company: z.string().optional(),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  projectType: z.string().min(1, 'Please select a project type'),
  description: z.string().min(10, 'Please describe your project (at least 10 characters)'),
  budget: z.string().optional(),
})

type ContactFormData = z.infer<typeof contactFormSchema>

export function PageContact() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      company: '',
      email: '',
      phone: '',
      projectType: '',
      description: '',
      budget: '',
    },
  })

  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleFormSubmit = async () => {
    const data = form.getValues()
    // TODO: Implement actual form submission to API
    await new Promise(resolve => setTimeout(resolve, 2000))
    return { success: true, message: 'Thank you! We\'ll get back to you within 24 hours.' }
  }

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

  return (
    <div className="font-sans bg-white text-gray-800">
      <HeaderMarketing />

      {/* Page Header */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-[#4F46E5]">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-800">Contact</span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Let's Talk About Your AI Project
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Schedule a free consultation to discuss how AI can transform your business and bring your ideas to life
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
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
                      <Form.Form form={form} onSubmit={form.handleSubmit(onSubmit)}>
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
                          required
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
                            {form.watch('description')?.length || 0}
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
                          request={handleFormSubmit}
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
                            <a href="#" className="text-[#4F46E5] hover:underline">Privacy Policy</a>
                          </p>
                          <p className="text-sm text-gray-600 font-medium mt-2">
                            We'll respond within 24 hours
                          </p>
                        </div>
                      </Form.Form>
                    )}
              </div>
            </div>

            {/* Calendly Section */}
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

      {/* Alternative Contact Methods */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Other Ways to Reach Us
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Email</h3>
              <a
                href="mailto:hello@neziva.com"
                className="text-[#4F46E5] font-medium text-lg hover:underline"
              >
                hello@neziva.com
              </a>
              <p className="text-gray-600 mt-2">Send us an email anytime</p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Response Time</h3>
              <p className="text-[#4F46E5] font-medium text-lg">Within 24 hours</p>
              <p className="text-gray-600 mt-2">We respond to all inquiries</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Collapsible
                key={index}
                open={openFaqIndex === index}
                onOpenChange={open => setOpenFaqIndex(open ? index : null)}
              >
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  <CollapsibleTrigger className="w-full px-6 py-5 text-left flex items-center justify-between bg-white hover:bg-gray-50 transition">
                    <span className="font-semibold text-gray-900 text-lg">
                      {faq.question}
                    </span>
                    {openFaqIndex === index
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

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-br from-[#4F46E5] to-[#7C3AED]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Let's discuss how AI can help your business achieve its goals
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button className="bg-white text-[#4F46E5] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition">
                Schedule Free Consultation
              </Button>
            </Link>
            <Link href="/services">
              <Button variant="outline" className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-[#4F46E5] transition">
                View Our Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-[#4F46E5] mb-2">50+</div>
              <div className="text-gray-600">Projects Completed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#4F46E5] mb-2">98%</div>
              <div className="text-gray-600">Client Satisfaction</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#4F46E5] mb-2">24h</div>
              <div className="text-gray-600">Response Time</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#4F46E5] mb-2">15min</div>
              <div className="text-gray-600">Calendly Response</div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Info */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Our Location & Hours
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-gray-100 rounded-xl h-96 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-16 w-16 text-[#4F46E5] mx-auto mb-4" />
                <p className="text-gray-600">Map integration would appear here</p>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <MapPin className="h-5 w-5 text-[#4F46E5] mr-3" />
                  Office Location
                </h3>
                <p className="text-gray-700">123 Tech Street, Suite 400</p>
                <p className="text-gray-700">San Francisco, CA 94105</p>
                <p className="text-gray-700">United States</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Clock className="h-5 w-5 text-[#4F46E5] mr-3" />
                  Business Hours
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Monday - Friday:</span>
                    <span className="text-gray-900 font-medium">9:00 AM - 6:00 PM PST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Saturday:</span>
                    <span className="text-gray-900 font-medium">10:00 AM - 4:00 PM PST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Sunday:</span>
                    <span className="text-gray-900 font-medium">Closed</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Globe className="h-5 w-5 text-[#4F46E5] mr-3" />
                  Remote Consultations
                </h3>
                <p className="text-gray-700">
                  We offer remote consultations worldwide via video call. Available 24/7 by appointment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FooterMarketing />
    </div>
  )
}
