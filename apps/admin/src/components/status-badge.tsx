import { cn } from '@/lib/utils'

const tones = {
  muted: 'bg-muted text-muted-foreground',
  amber: 'bg-amber-50 text-amber-800 border-amber-200',
  blue: 'bg-blue-50 text-blue-800 border-blue-200',
  green: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  red: 'bg-red-50 text-red-800 border-red-200',
  violet: 'bg-violet-50 text-violet-800 border-violet-200',
} as const

export function StatusBadge({
  label,
  tone = 'muted',
  className,
}: {
  label: string
  tone?: keyof typeof tones
  className?: string
}) {
  return (
    <span className={cn(
      'inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium',
      tones[tone],
      className,
    )}
    >
      {label}
    </span>
  )
}
