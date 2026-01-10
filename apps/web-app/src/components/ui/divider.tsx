import { cn } from '@/lib/utils'

interface DividerProps {
  className?: string
  orientation?: 'horizontal' | 'vertical'
}

export function Divider({ className, orientation = 'horizontal' }: DividerProps) {
  const baseClasses = orientation === 'horizontal'
    ? 'w-full h-[1px] bg-gray-100'
    : 'h-full w-[1px] bg-gray-100'

  return <div className={cn(baseClasses, className)} />
}
