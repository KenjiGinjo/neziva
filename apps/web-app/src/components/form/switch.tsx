import type { WrapperProps } from './base'
import { Switch as SwitchBase } from '@/components/ui/switch'
import { FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { useFormContext } from './base'

export type SwitchProps = WrapperProps & {
  label?: string
  description?: string
  size?: 'default' | 'large'
}
export function Switch(props: SwitchProps) {
  const { form } = useFormContext()
  const { label, description } = props

  return (
    <FormField
      control={form.control}
      name={props.name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <div className="flex items-center space-x-2">
              <SwitchBase
                checked={field.value}
                onCheckedChange={field.onChange}
              />
              {(label || description) && (
                <div className="space-y-1 text-gray-700">
                  {label && (
                    <label
                      htmlFor={props.name}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {label}
                    </label>
                  )}
                  {description && (
                    <p className="text-sm text-muted-foreground">
                      {description}
                    </p>
                  )}
                </div>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
