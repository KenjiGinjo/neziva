import type { WrapperProps } from './base'
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useFormContext, Wrapper } from './base'

export type FormSelectProps = WrapperProps & {
  options: readonly { value: string, label: string }[]
  placeholder?: string
}

export function FormSelect(props: FormSelectProps) {
  const { form } = useFormContext()

  return (
    <Wrapper {...props}>
      <FormField
        control={form.control}
        name={props.name}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Select
                value={field.value === undefined || field.value === null || field.value === '' ? undefined : String(field.value)}
                onValueChange={field.onChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={props.placeholder || '请选择'} />
                </SelectTrigger>
                <SelectContent>
                  {props.options.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </Wrapper>
  )
}
