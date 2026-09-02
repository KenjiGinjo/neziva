import { IconAiGenerate3DLine } from '@neziva/svg'
import { ChatThread } from '@/components/chat-thread'
import { useI18n } from '@/i18n'

export function HomeAIDemo() {
  const { m } = useI18n()

  return (
    <section className="py-24 bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {m.chat.title}
          </h2>
          <p className="text-xl text-gray-600">
            {m.chat.subtitle}
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <IconAiGenerate3DLine className="w-6 h-6 text-[#4F46E5]" />
              </div>
              <div>
                <div className="text-white font-bold text-lg">{m.chat.assistantName}</div>
                <div className="text-purple-100 text-sm flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
                  {m.chat.online}
                </div>
              </div>
            </div>
          </div>
          <ChatThread />
        </div>
      </div>
    </section>
  )
}
