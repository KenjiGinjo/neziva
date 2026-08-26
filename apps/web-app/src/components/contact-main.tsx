import type { vContactSubmit } from '@neziva/validations'
import type { FieldValues, UseFormReturn } from 'react-hook-form'
import { CheckCircle, Clock, Mail, Send } from 'lucide-react'
import { Form } from '@/components/form'
import { Select as FormSelect } from '@/components/form/select'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/i18n'
import { $qc } from '@/query-client'

const CONTACT_EMAIL = 'kenjiginjo@gmail.com'

interface ContactMainProps<T extends FieldValues> {
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
  const { m } = useI18n()
  const c = m.contact

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{c.formTitle}</h2>
              <p className="text-gray-600 mb-8">{c.formSubtitle}</p>

              {submitSuccess
                ? (
                    <div className="bg-green-50 border border-green-200 text-green-800 px-6 py-4 rounded-lg flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2 shrink-0" />
                      <span>{c.success}</span>
                    </div>
                  )
                : (
                    <Form.Form form={form} onChange={v => patch(v)} className="space-y-3">
                      <Form.Input
                        name="name"
                        label={c.name}
                        placeholder={c.namePlaceholder}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent transition"
                      />

                      <Form.Input
                        name="company"
                        label={c.company}
                        desc={m.common.optional}
                        placeholder={c.companyPlaceholder}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent transition"
                      />

                      <Form.Input
                        name="email"
                        type="email"
                        label={c.email}
                        placeholder={c.emailPlaceholder}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent transition"
                      />

                      <Form.Input
                        name="phone"
                        type="tel"
                        label={c.phone}
                        desc={m.common.optional}
                        placeholder={c.phonePlaceholder}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent transition"
                      />

                      <FormSelect
                        name="projectType"
                        label={c.projectType}
                        placeholder={c.projectTypePlaceholder}
                        options={[...c.projectTypes]}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent transition"
                      />

                      <div>
                        <Form.Textarea
                          name="description"
                          label={c.description}
                          placeholder={c.descriptionPlaceholder}
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
                        label={c.budget}
                        desc={m.common.optional}
                        placeholder={c.budgetPlaceholder}
                        options={[...c.budgets]}
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
                          type="button"
                          className="w-full bg-[#F97316] hover:bg-orange-600 text-white font-semibold py-4 rounded-lg transition flex items-center justify-center"
                        >
                          <Send className="h-5 w-5 mr-2" />
                          {c.send}
                        </Button>
                      </Form.Submit>

                      <div className="text-center mt-4">
                        <p className="text-sm text-gray-500">{c.neverShare}</p>
                      </div>
                    </Form.Form>
                  )}
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border border-gray-200 p-8">
              <div className="w-14 h-14 bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] rounded-xl flex items-center justify-center mb-6">
                <Mail className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{c.emailDirectTitle}</h3>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">{c.emailDirectBody}</p>
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(c.mailSubject)}`}
                className="text-[#4F46E5] font-semibold text-lg hover:underline break-all"
              >
                {CONTACT_EMAIL}
              </a>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="h-6 w-6 text-[#10B981]" />
                <h3 className="text-lg font-bold text-gray-900">{c.responseTitle}</h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">{c.responseBody}</p>
              <p className="text-gray-500 text-sm">{c.hours}</p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">{c.nextTitle}</h3>
              <ol className="space-y-4 text-sm text-gray-600">
                {c.nextSteps.map((step, i) => (
                  <li key={step} className="flex gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#4F46E5] text-white text-xs flex items-center justify-center shrink-0 font-bold">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
