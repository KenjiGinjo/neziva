import { Award, CheckCircle, Code, Cog, ExternalLink, Rocket, Shield, Sparkles, Users } from 'lucide-react'
import { useI18n } from '@/i18n'

const TILE_ICONS = [Sparkles, Code, Cog, Rocket] as const
const TILE_COLORS = ['text-[#7C3AED]', 'text-[#4F46E5]', 'text-[#F97316]', 'text-[#10B981]'] as const

export function AboutMain() {
  const { m } = useI18n()

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">{m.about.whatWeDo}</h2>
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              {m.about.points.map(point => (
                <p key={point.title} className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-[#10B981] mt-1 flex-shrink-0" />
                  <span>
                    <strong className="text-gray-900">{point.title}</strong>
                    {' '}
                    {point.body}
                  </span>
                </p>
              ))}
            </div>

            <p className="text-gray-600 leading-relaxed">{m.about.ledBy}</p>
            <a
              href="https://kenjiginjo.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#4F46E5] font-semibold hover:text-[#7C3AED] transition"
            >
              {m.about.founder}
              <ExternalLink className="h-4 w-4" />
            </a>

            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <div className="flex items-start gap-3">
                <Shield className="h-6 w-6 text-[#10B981] shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{m.about.registeredTitle}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {m.about.registeredLegal}
                    <br />
                    {m.about.registeredMeta}
                    <br />
                    {m.about.registeredUscc}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-6 sm:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full">
                {m.about.tiles.map((tile, i) => {
                  const Icon = TILE_ICONS[i]
                  return (
                    <div key={tile.title} className="bg-white rounded-xl p-6 shadow-lg hover:-translate-y-1 transition-transform">
                      <Icon className={`h-10 w-10 ${TILE_COLORS[i]} mb-4`} />
                      <h3 className="font-bold text-gray-900 mb-2">{tile.title}</h3>
                      <p className="text-sm text-gray-600">{tile.body}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mt-16 max-w-2xl">
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <Users className="h-8 w-8 text-[#4F46E5] mb-3" />
            <h3 className="font-bold text-gray-900 mb-1">{m.about.directTitle}</h3>
            <p className="text-sm text-gray-600">{m.about.directBody}</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <Award className="h-8 w-8 text-[#7C3AED] mb-3" />
            <h3 className="font-bold text-gray-900 mb-1">{m.about.handsOnTitle}</h3>
            <p className="text-sm text-gray-600">{m.about.handsOnBody}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
