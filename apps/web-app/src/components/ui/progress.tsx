import * as ProgressPrimitive from '@radix-ui/react-progress'
import * as React from 'react'

import { cn } from '@/lib/utils'

function Progress({
  className,
  color,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root> & { color?: string }) {
  const defaultColor = color || '#4F46E5'
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        'bg-indigo-100 dark:bg-indigo-900/30 relative h-2.5 w-full overflow-hidden rounded-full shadow-inner',
        className,
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="h-full w-full flex-1 transition-all duration-500 ease-out rounded-full shadow-sm"
        style={{
          transform: `translateX(-${100 - (value || 0)}%)`,
          backgroundColor: defaultColor,
          boxShadow: `0 0 8px ${defaultColor}40`,
        }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress }
