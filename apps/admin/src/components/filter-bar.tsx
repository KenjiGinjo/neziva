import type { ReactNode } from 'react'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export function FilterBar({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
      {children}
    </div>
  )
}

export function FilterSearch({
  value,
  onChange,
  placeholder = '搜索',
}: {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}) {
  return (
    <Input
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="sm:max-w-64"
    />
  )
}

const ALL = '__all__'

export function FilterSelect({
  value,
  onChange,
  options,
  placeholder,
  className = 'w-full sm:w-40',
}: {
  value: string
  onChange: (value: string) => void
  options: readonly { value: string, label: string }[]
  placeholder: string
  className?: string
}) {
  return (
    <Select value={value || ALL} onValueChange={v => onChange(v === ALL ? '' : v)}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={ALL}>{placeholder}</SelectItem>
        {options.map(option => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
