import type { ReactNode } from 'react'
import type { FieldPath, FieldValues, UseFormReturn } from 'react-hook-form'
import type { FormItem } from '@/components/ui/form'
import { createContext, useContext, useEffect, useMemo } from 'react'
import { Form } from '@/components/ui/form'
import { cn } from '@/lib/utils'

function Desc({ children }: { children: ReactNode }) {
  return <div className="-mt-[8px] mb-[8px] leading-normal text-gray-400">{children}</div>
}

function Label({ children }: { children: ReactNode }) {
  return <div className="text-gray-700 font-bold leading-none pb-[8px]">{children}</div>
}

export type WrapperProps<TFieldValues extends FieldValues = FieldValues> = {
  name: FieldPath<TFieldValues>
  label?: string
  desc?: string
  className?: string
  wrapperClassName?: string
} & Omit<React.ComponentProps<typeof FormItem>, 'name'>

export function Wrapper<TFieldValues extends FieldValues = FieldValues>(props: WrapperProps<TFieldValues>) {
  const { label, desc, children, wrapperClassName } = props

  return (
    <div className={cn('pb-[24px]', wrapperClassName)}>
      {label && <Label>{label}</Label>}
      {desc && <Desc>{desc}</Desc>}
      {children}
    </div>
  )
}

const FormContext = createContext<{ form: UseFormReturn<any> } | undefined>(undefined)

export function useFormContext() {
  const context = useContext(FormContext)

  if (!context) {
    throw new Error('useFormContext must be used within a FormComponent')
  }

  return context
}

interface FormComponentProps<TFieldValues extends FieldValues = FieldValues> {
  form: UseFormReturn<TFieldValues>
  children: ReactNode
  onChange?: (values: TFieldValues) => void
  className?: string
}

export function FormComponent<TFieldValues extends FieldValues = FieldValues>(props: FormComponentProps<TFieldValues>) {
  const { form, children, onChange, className } = props

  useEffect(() => {
    if (!onChange) {
      return
    }

    const subscription = form.watch((e) => {
      onChange(e as unknown as TFieldValues)
    })

    return () => subscription.unsubscribe()
  }, [form, onChange])

  return (
    <FormContext.Provider value={useMemo(() => ({ form }), [form])}>
      <Form {...form}>
        <form className={cn(className)}>
          {children}
        </form>
      </Form>
    </FormContext.Provider>
  )
}
