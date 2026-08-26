import { useI18n } from '@/i18n'
import { cn } from '@/lib/utils'

export function LanguageSwitch({ className }: { className?: string }) {
  const { locale, setLocale, m } = useI18n()

  return (
    <div className={cn('flex items-center gap-1 text-sm font-medium', className)}>
      <button
        type="button"
        onClick={() => setLocale('en')}
        className={cn(
          'px-1.5 py-0.5 rounded transition-colors',
          locale === 'en' ? 'text-[#4F46E5] font-semibold' : 'text-gray-500 hover:text-gray-800',
        )}
        aria-label={m.nav.switchToEn}
        aria-current={locale === 'en' ? 'true' : undefined}
      >
        EN
      </button>
      <span className="text-gray-300">|</span>
      <button
        type="button"
        onClick={() => setLocale('zh')}
        className={cn(
          'px-1.5 py-0.5 rounded transition-colors',
          locale === 'zh' ? 'text-[#4F46E5] font-semibold' : 'text-gray-500 hover:text-gray-800',
        )}
        aria-label={m.nav.switchToZh}
        aria-current={locale === 'zh' ? 'true' : undefined}
      >
        中文
      </button>
    </div>
  )
}
