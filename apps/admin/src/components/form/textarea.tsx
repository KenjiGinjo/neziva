import type { WrapperProps } from './base'
import { Textarea as TextareaBase } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { useFormContext, Wrapper } from './base'

export type TextareaProps = WrapperProps & React.ComponentProps<'textarea'>
export function Textarea(props: TextareaProps) {
  const { form } = useFormContext()

  return (
    <Wrapper {...props}>
      <FormField
        control={form.control}
        name={props.name}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <TextareaBase {...field} {...props} value={field.value ?? ''} className={cn(props.className)} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </Wrapper>
  )
}
