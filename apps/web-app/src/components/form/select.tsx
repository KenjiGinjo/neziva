import type { ComponentProps } from 'react'
import type { WrapperProps } from './base'
import { Select as SelectBase, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { useFormContext, Wrapper } from './base'

/** `dir` matches Radix; other props are asserted—`WrapperProps` includes div HTML attributes. */
export type SelectProps = Omit<WrapperProps, 'dir'> & {
  dir?: 'ltr' | 'rtl'
  options: { value: string, label: string }[]
  placeholder?: string
  className?: string
}

export function Select(props: SelectProps) {
  const { form } = useFormContext()
  const { wrapperClassName, label, desc, options, placeholder, className, ...selectProps } = props

  return (
    <Wrapper {...props}>
      <FormField
        control={form.control}
        name={props.name}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <SelectBase
                {...({
                  value: field.value || '',
                  onValueChange: field.onChange,
                  ...selectProps,
                } as ComponentProps<typeof SelectBase>)}
              >
                <SelectTrigger className={cn('w-full', className)}>
                  <SelectValue placeholder={placeholder || 'Select an option'} />
                </SelectTrigger>
                <SelectContent>
                  {options.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectBase>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </Wrapper>
  )
}
