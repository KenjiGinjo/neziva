import { Link } from 'wouter'
import { useI18n } from '@/i18n'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  const { m } = useI18n()
  return (
    <nav
      className={`text-sm text-gray-500 ${className}`}
      aria-label={m.common.breadcrumb}
    >
      {items.map((item, i) => {
        const isLast = i === items.length - 1
        return (
          <span key={item.label}>
            {item.href && !isLast
              ? (
                  <Link href={item.href} className="hover:text-[#4F46E5]">
                    {item.label}
                  </Link>
                )
              : (
                  <span className="text-gray-900 font-medium">{item.label}</span>
                )}
            {!isLast && <span className="mx-2">/</span>}
          </span>
        )
      })}
    </nav>
  )
}
