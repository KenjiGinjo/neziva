import { IconAiGenerate3DLine } from '@neziva/svg'
import { Code, Lightbulb, Rocket } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function HomeAIDemo() {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Try Our AI Assistant
          </h2>
          <p className="text-xl text-gray-600">
            Ask about your business needs and see how AI can help
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <IconAiGenerate3DLine className="w-6 h-6 text-[#4F46E5]" />
              </div>
              <div>
                <div className="text-white font-bold text-lg">Neziva AI Assistant</div>
                <div className="text-purple-100 text-sm flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
                  Online
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 h-96 overflow-y-auto bg-gray-50">
            <div className="flex items-start mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] rounded-full flex items-center justify-center flex-shrink-0">
                <IconAiGenerate3DLine className="w-5 h-5 text-white" />
              </div>
              <div className="ml-3 bg-white rounded-lg rounded-tl-none p-4 shadow-sm max-w-md">
                <p className="text-gray-800">
                  Hi! I'm Neziva's AI assistant. What kind of AI solution are you looking for?
                </p>
                <p className="text-xs text-gray-500 mt-2">Just now</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-6">
              <button className="bg-white border-2 border-gray-200 rounded-lg p-4 text-left hover:border-[#4F46E5] hover:bg-blue-50 transition">
                <Lightbulb className="h-6 w-6 text-[#F97316] mb-2" />
                <div className="font-semibold text-gray-900 text-sm">Strategy Session</div>
                <div className="text-xs text-gray-600">Explore AI opportunities</div>
              </button>
              <button className="bg-white border-2 border-gray-200 rounded-lg p-4 text-left hover:border-[#4F46E5] hover:bg-blue-50 transition">
                <Code className="h-6 w-6 text-[#4F46E5] mb-2" />
                <div className="font-semibold text-gray-900 text-sm">Build a POC</div>
                <div className="text-xs text-gray-600">Validate your concept</div>
              </button>
              <button className="bg-white border-2 border-gray-200 rounded-lg p-4 text-left hover:border-[#4F46E5] hover:bg-blue-50 transition">
                <Rocket className="h-6 w-6 text-[#10B981] mb-2" />
                <div className="font-semibold text-gray-900 text-sm">Full Development</div>
                <div className="text-xs text-gray-600">Complete AI system</div>
              </button>
              <button className="bg-white border-2 border-gray-200 rounded-lg p-4 text-left hover:border-[#4F46E5] hover:bg-blue-50 transition">
                <IconAiGenerate3DLine className="w-6 h-6 text-[#7C3AED] mb-2" />
                <div className="font-semibold text-gray-900 text-sm">Custom Question</div>
                <div className="text-xs text-gray-600">Ask anything</div>
              </button>
            </div>
          </div>
          <div className="p-6 bg-white border-t border-gray-200">
            <div className="flex space-x-3">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#4F46E5] transition"
              />
              <Button className="bg-[#4F46E5] hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold">
                Send
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
