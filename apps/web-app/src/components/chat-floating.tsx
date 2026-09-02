import { IconAiGenerate3DLine } from '@neziva/svg'
import { MessageCircle, X } from 'lucide-react'
import { useState } from 'react'
import { ChatThread } from '@/components/chat-thread'
import { useI18n } from '@/i18n'
import { cn } from '@/lib/utils'

export function ChatFloating() {
  const { m } = useI18n()
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      <div
        className={cn(
          'w-[min(100vw-2rem,24rem)] rounded-2xl shadow-2xl overflow-hidden border border-gray-200 bg-white origin-bottom-right transition-all duration-200',
          open
            ? 'opacity-100 scale-100 translate-y-0'
            : 'pointer-events-none opacity-0 scale-95 translate-y-2 h-0 border-0 shadow-none overflow-hidden',
        )}
        hidden={!open}
      >
        <div className="bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-white font-semibold text-sm">
            <IconAiGenerate3DLine className="w-4 h-4" />
            {m.chat.assistantName}
          </div>
          <button type="button" onClick={() => setOpen(false)} className="text-white/80 hover:text-white" aria-label={m.chat.close}>
            <X className="h-4 w-4" />
          </button>
        </div>
        <ChatThread compact />
      </div>
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className="w-14 h-14 bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-full shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 hover:scale-105 active:scale-95 transition-all flex items-center justify-center"
        aria-label={open ? m.chat.close : m.chat.open}
        aria-expanded={open}
      >
        {open
          ? <X className="h-6 w-6" />
          : <MessageCircle className="h-6 w-6" />}
      </button>
    </div>
  )
}
