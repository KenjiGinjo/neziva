import type { WrapperProps } from './base'
import { Input as InputBase } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { useFormContext, Wrapper } from './base'

export type InputProps = WrapperProps & React.ComponentProps<'input'>
export function Input(props: InputProps) {
  const { form } = useFormContext()

  return (
    <Wrapper {...props}>
      <FormField
        control={form.control}
        name={props.name}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <InputBase {...field} {...props} value={field.value ?? ''} className={cn(props.className)} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </Wrapper>
  )
}
