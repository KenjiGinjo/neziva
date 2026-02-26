import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all cursor-pointer disabled:pointer-events-none disabled:opacity-50  [&_svg]:pointer-events-none [&_svg:not([class*=\'size-\'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
  {
    variants: {
      variant: {
        default:
          'bg-[#4F46E5] text-white shadow-sm hover:bg-[#4338CA] active:bg-[#3730A3] hover:shadow-md transition-shadow',
        destructive:
          'bg-destructive text-white shadow-sm hover:bg-destructive/90 active:bg-destructive/80 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 hover:shadow-md transition-shadow',
        outline:
          'border-2 border-[#4F46E5]/30 bg-background text-[#4F46E5] shadow-sm hover:bg-indigo-50 hover:border-[#4F46E5] hover:text-[#4338CA] active:bg-indigo-100 dark:bg-input/30 dark:border-[#4F46E5]/40 dark:hover:bg-[#4F46E5]/10 dark:hover:border-[#4F46E5]/60 transition-all',
        secondary:
          'bg-indigo-100 text-[#4F46E5] shadow-sm hover:bg-indigo-200 active:bg-indigo-300 dark:bg-indigo-900/30 dark:text-indigo-300 dark:hover:bg-indigo-900/40 transition-all',
        ghost:
          'text-[#4F46E5] hover:bg-indigo-50 hover:text-[#4338CA] active:bg-indigo-100 dark:hover:bg-indigo-900/20 dark:text-indigo-400 dark:hover:text-indigo-300 transition-all',
        link: 'text-[#4F46E5] underline-offset-4 hover:text-[#4338CA] hover:underline active:text-[#3730A3] transition-colors',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
