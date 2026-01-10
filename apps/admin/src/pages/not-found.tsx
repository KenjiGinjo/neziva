import { Link } from 'wouter'
import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { TypographyH3, TypographyMuted } from '@/components/ui/typography'
import { cn } from '@/lib/utils'

export function NotFound() {
  return (
    <div className="min-h-screen space-x-4 bg-white">
      <div className="w-full flex flex-col items-center">
        <div className="flex h-8 gap-2 items-center mt-12">
          <TypographyH3>404</TypographyH3>
          <Separator orientation="vertical" />
          <div>页面不存在</div>
        </div>
        <TypographyMuted className="mt-6">请检查 URL 或返回上一页。</TypographyMuted>
        <Link href="/" className={cn(buttonVariants({ variant: 'default' }), 'mt-12')}>返回首页</Link>
      </div>
    </div>
  )
}
