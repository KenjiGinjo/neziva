import type { WrapperProps } from './base'
import { IconAddLine, IconSubtractLine } from '@neziva/svg'
import { useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Input as InputBase } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { useFormContext, Wrapper } from './base'

export type InputStepProps = WrapperProps & React.ComponentProps<'input'> & {
  max?: number
  min?: number
  step?: number
}

export function InputStep(props: InputStepProps) {
  const { form } = useFormContext()
  const { max, min, step = 1, ...inputProps } = props
  const { name } = props

  const handleIncrement = useCallback(() => {
    const currentValue = form.getValues(name) || 0
    const newValue = currentValue + step
    if (max === undefined || newValue <= max) {
      form.setValue(name, newValue)
    }
  }, [form, name, step, max])

  const handleDecrement = useCallback(() => {
    const currentValue = form.getValues(name) || 0
    const newValue = currentValue - step
    if (min === undefined || newValue >= min) {
      form.setValue(name, newValue)
    }
  }, [form, name, step, min])

  const isIncrementDisabled = max !== undefined && (form.getValues(name) || 0) >= max
  const isDecrementDisabled = min !== undefined && (form.getValues(name) || 0) <= min

  return (
    <Wrapper {...props}>
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={handleDecrement}
                  disabled={isDecrementDisabled}
                  className="h-9 w-9 shrink-0"
                >
                  <IconSubtractLine className="size-4" />
                </Button>
                <InputBase
                  {...field}
                  {...inputProps}
                  type="number"
                  min={min}
                  max={max}
                  step={step}
                  value={field.value ?? ''}
                  className={cn('bg-gray-200 border-0 text-center', inputProps.className)}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={handleIncrement}
                  disabled={isIncrementDisabled}
                  className="h-9 w-9 shrink-0"
                >
                  <IconAddLine className="size-4" />
                </Button>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </Wrapper>
  )
}
