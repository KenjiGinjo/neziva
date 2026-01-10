import { cn } from '@/lib/utils'

interface DescSecProps {
  title: string
  desc?: string
  isUrl?: boolean
  className?: string
  children?: React.ReactNode
}

export function DescSec({ title, desc, isUrl, className, children }: DescSecProps) {
  return (
    <div className={cn('text-gray-700 pb-10 break-words', className)}>
      <p className="font-bold mb-4">{title}</p>
      {children}
      {desc && (
        <p>
          {isUrl
            ? <a href={desc} target="_blank" rel="noopener noreferrer" className="text-cyan-500 underline line-clamp-1">{desc}</a>
            : desc}
        </p>
      )}
    </div>
  )
}
