import { cn } from '@/lib/utils'

export function MainLayout({ children, className, style }: { children: React.ReactNode, className?: string, style?: React.CSSProperties }) {
  return (
    <div className={cn('min-h-screen w-full bg-background', className)} style={style}>
      {children}
    </div>
  )
}
