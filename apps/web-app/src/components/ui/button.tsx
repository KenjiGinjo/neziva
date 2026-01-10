import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*=\'size-\'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
  {
    variants: {
      variant: {
        default:
          'bg-pink-500 text-white shadow-sm hover:bg-pink-600 active:bg-pink-700 hover:shadow-md transition-shadow',
        destructive:
          'bg-destructive text-white shadow-sm hover:bg-destructive/90 active:bg-destructive/80 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 hover:shadow-md transition-shadow',
        outline:
          'border-2 border-pink-500/30 bg-background text-pink-600 shadow-sm hover:bg-pink-50 hover:border-pink-500 hover:text-pink-700 active:bg-pink-100 dark:bg-input/30 dark:border-pink-500/40 dark:hover:bg-pink-500/10 dark:hover:border-pink-500/60 transition-all',
        secondary:
          'bg-pink-100 text-pink-700 shadow-sm hover:bg-pink-200 active:bg-pink-300 dark:bg-pink-900/30 dark:text-pink-300 dark:hover:bg-pink-900/40 transition-all',
        ghost:
          'text-pink-600 hover:bg-pink-50 hover:text-pink-700 active:bg-pink-100 dark:hover:bg-pink-900/20 dark:text-pink-400 dark:hover:text-pink-300 transition-all',
        link: 'text-pink-500 underline-offset-4 hover:text-pink-600 hover:underline active:text-pink-700 transition-colors',
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
