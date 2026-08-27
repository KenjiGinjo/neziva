import { IconAiGenerate3DLine } from '@neziva/svg'
import { Link } from 'wouter'
import { cn } from '@/lib/utils'

const sizeMap = {
  xs: 'w-4 h-4',
  sm: 'w-5 h-5',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-12 h-12',
} as const

const boxSizeMap = {
  xs: 'w-8 h-8',
  sm: 'w-10 h-10',
  md: 'w-12 h-12',
  lg: 'w-16 h-16',
  xl: 'w-24 h-24',
} as const

export type LogoSize = keyof typeof sizeMap

interface LogoProps {
  /** Icon size: xs(16px), sm(20px), md(24px), lg(32px), xl(48px) */
  size?: LogoSize
  /** Wrap icon in gradient box (brand purple) */
  withBox?: boolean
  /** Show "neziva" text next to icon */
  withText?: boolean
  /** Icon color - uses currentColor when not in box. In box, icon is always white. */
  className?: string
  /** Link href - when set, logo becomes a link */
  href?: string
}

export function Logo({
  size = 'sm',
  withBox = false,
  withText = false,
  className,
  href,
}: LogoProps) {
  const iconSize = sizeMap[size]
  const boxSize = boxSizeMap[size]

  const icon = (
    <IconAiGenerate3DLine
      className={cn(iconSize, withBox ? 'text-white' : 'text-[#4F46E5]')}
    />
  )

  const content = withBox ? (
    <div
      className={cn(
        'rounded-lg flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-[#4F46E5] to-[#7C3AED]',
        boxSize,
      )}
    >
      {icon}
    </div>
  ) : (
    icon
  )

  const text = withText && (
    <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] bg-clip-text text-transparent">
      Neziva
    </span>
  )

  const wrapper = (
    <span className={cn('inline-flex items-center gap-2 md:gap-3', className)}>
      {content}
      {text}
    </span>
  )

  if (href !== undefined) {
    const classNames = cn('inline-flex items-center gap-2 md:gap-3', className)
    if (href.startsWith('/zh')) {
      return (
        <a href={href} className={classNames}>
          {content}
          {text}
        </a>
      )
    }
    return (
      <Link href={href} className={classNames}>
        {content}
        {text}
      </Link>
    )
  }

  return wrapper
}
