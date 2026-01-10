import type { WrapperProps } from './base'
import { cn } from '@/lib/utils'
import { FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { useFormContext, Wrapper } from './base'

export type RadioProps = WrapperProps & {
  items: { label: string, value: string }[]
  size?: 'default' | 'large'
}
export function Radio(props: RadioProps) {
  const { form } = useFormContext()
  const { size = 'default' } = props

  const sizeClasses = {
    default: 'px-4 py-2',
    large: 'p-4 text-xl font-bold',
  }

  return (
    <Wrapper {...props}>
      <FormField
        control={form.control}
        name={props.name}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className="flex flex-wrap gap-2">
                {props.items.map(item => (
                  <div key={item.value} className="relative">
                    <input
                      type="radio"
                      id={`${props.name}-${item.value}`}
                      name={props.name}
                      value={item.value}
                      checked={field.value === item.value}
                      onChange={e => field.onChange(e.target.value)}
                      className="sr-only"
                    />
                    <label
                      htmlFor={`${props.name}-${item.value}`}
                      className={cn(`
                          inline-block rounded-lg cursor-pointer transition-all duration-200
                          ${sizeClasses[size]}
                          ${field.value === item.value
                    ? 'bg-gray-800 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }
                        `)}
                    >
                      {item.label}
                    </label>
                  </div>
                ))}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </Wrapper>
  )
}
