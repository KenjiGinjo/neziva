import { useChat } from '@ai-sdk/react'
import { IconAiGenerate3DLine } from '@neziva/svg'
import { Send } from 'lucide-react'
import { useEffect, useMemo, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/i18n'
import { cn } from '@/lib/utils'

function chatApiUrl() {
  const base = (import.meta.env.DEV ? import.meta.env.VITE_API_URL_DEV : import.meta.env.VITE_API_URL) as string
  return `${String(base || '').replace(/\/$/, '')}/chat`
}

export function ChatThread({ className, compact }: { className?: string, compact?: boolean }) {
  const { m } = useI18n()
  const bottomRef = useRef<HTMLDivElement>(null)
  const suggestions = useMemo(() => [
    { label: m.chat.s1Title, prompt: m.chat.s1Prompt },
    { label: m.chat.s2Title, prompt: m.chat.s2Prompt },
    { label: m.chat.s3Title, prompt: m.chat.s3Prompt },
  ], [m])

  const { messages, input, handleInputChange, handleSubmit, append, isLoading, error } = useChat({
    api: chatApiUrl(),
    initialMessages: [
      { id: 'welcome', role: 'assistant', content: m.chat.welcome },
    ],
  })

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  const showSuggestions = messages.length <= 1 && !isLoading

  return (
    <div className={cn('flex flex-col bg-white overflow-hidden', className)}>
      <div className={cn('overflow-y-auto bg-gray-50 p-4 space-y-4', compact ? 'h-80' : 'h-96')}>
        {messages.map(message => (
          <div
            key={message.id}
            className={cn('flex items-start', message.role === 'user' ? 'justify-end' : '')}
          >
            {message.role !== 'user' && (
              <div className="w-7 h-7 bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] rounded-full flex items-center justify-center flex-shrink-0">
                <IconAiGenerate3DLine className="w-3.5 h-3.5 text-white" />
              </div>
            )}
            <div
              className={cn(
                'rounded-lg p-3 shadow-sm max-w-[85%] text-sm leading-relaxed',
                message.role === 'user'
                  ? 'bg-[#4F46E5] text-white rounded-tr-none'
                  : 'ml-3 bg-white text-gray-800 rounded-tl-none',
              )}
            >
              {message.role === 'user'
                ? <p className="whitespace-pre-wrap">{message.content}</p>
                : (
                    <div className="prose prose-sm max-w-none prose-p:my-1 prose-ul:my-1">
                      <ReactMarkdown>{message.content}</ReactMarkdown>
                    </div>
                  )}
            </div>
          </div>
        ))}
        {isLoading && (
          <p className="text-xs text-gray-500 pl-13">{m.chat.thinking}</p>
        )}
        {error && (
          <p className="text-sm text-red-600">{error.message || m.chat.error}</p>
        )}
        {showSuggestions && (
          <div className="flex flex-wrap gap-1.5">
            {suggestions.map(item => (
              <button
                key={item.label}
                type="button"
                className="bg-white border border-gray-200 rounded-full px-2.5 py-1 text-xs text-gray-700 hover:border-[#4F46E5] hover:text-[#4F46E5] hover:bg-indigo-50 transition"
                onClick={() => append({ role: 'user', content: item.prompt })}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-gray-200 flex space-x-3">
        <input
          value={input}
          onChange={handleInputChange}
          placeholder={m.chat.placeholder}
          className="flex-1 border-2 border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#4F46E5] transition"
        />
        <Button type="submit" disabled={isLoading || !input.trim()} className="px-5">
          <Send className="h-4 w-4" />
          <span className="sr-only">{m.chat.send}</span>
        </Button>
      </form>
    </div>
  )
}
