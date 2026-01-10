import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-full border px-2.5 py-0.5 text-xs font-semibold w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1.5 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-all overflow-hidden',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-pink-500 text-white shadow-sm [a&]:hover:bg-pink-600 [a&]:hover:shadow-md',
        secondary:
          'border-transparent bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300 [a&]:hover:bg-pink-200 dark:[a&]:hover:bg-pink-900/40',
        destructive:
          'border-transparent bg-red-500 text-white shadow-sm [a&]:hover:bg-red-600 [a&]:hover:shadow-md focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-red-600/80',
        outline:
          'border-2 border-pink-500/40 bg-transparent text-pink-600 dark:border-pink-500/50 dark:text-pink-400 [a&]:hover:bg-pink-50 [a&]:hover:border-pink-500 dark:[a&]:hover:bg-pink-900/20',
        success:
          'border-transparent bg-emerald-500 text-white shadow-sm [a&]:hover:bg-emerald-600 [a&]:hover:shadow-md',
        warning:
          'border-transparent bg-amber-500 text-white shadow-sm [a&]:hover:bg-amber-600 [a&]:hover:shadow-md',
        info:
          'border-transparent bg-blue-500 text-white shadow-sm [a&]:hover:bg-blue-600 [a&]:hover:shadow-md',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'span'

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
