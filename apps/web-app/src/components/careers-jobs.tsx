import { Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/i18n'

const CONTACT_EMAIL = 'kenjiginjo@gmail.com'

export function CareersJobs() {
  const { m } = useI18n()

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="space-y-10">
          {m.careers.jobs.map(job => (
            <article
              key={job.title}
              className="border border-gray-200 rounded-2xl p-8 md:p-10"
            >
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900">{job.title}</h3>
                <span className="text-sm font-medium text-[#4F46E5] bg-[#4F46E5]/10 px-3 py-1 rounded-full">
                  {job.type}
                </span>
              </div>
              <p className="text-lg text-gray-600 mb-8">{job.summary}</p>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">{m.careers.duties}</h4>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    {job.duties.map(item => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">{m.careers.want}</h4>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    {job.want.map(item => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <a href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(job.mailSubject)}`}>
                <Button className="bg-[#F97316] hover:bg-orange-600 text-white">
                  <Mail className="mr-2 h-4 w-4" />
                  {m.careers.mailCta}
                </Button>
              </a>
            </article>
          ))}
        </div>

        <div className="mt-16 max-w-3xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{m.careers.apply}</h2>
          <p className="text-lg text-gray-600 mb-2">
            {m.careers.applyTo}{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#4F46E5] font-medium hover:underline">
              {CONTACT_EMAIL}
            </a>
          </p>
          <p className="text-lg text-gray-600">{m.careers.applyNote}</p>
        </div>
      </div>
    </section>
  )
}
