import { cn } from '@/lib/utils'

export function MainLayout({ children, className }: { children: React.ReactNode, className?: string | undefined }) {
  return (
    <div className={cn('p-4', className)}>
      {children}
    </div>
  )
}
