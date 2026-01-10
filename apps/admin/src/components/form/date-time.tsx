'use client'

import { ChevronDownIcon } from 'lucide-react'
import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { useFormContext, Wrapper, type WrapperProps } from './base'

export type FormDateTimePickerProps = WrapperProps & {
  showLabels?: boolean
  dateLabel?: string
  timeLabel?: string
}

export function FormDateTimePicker(props: FormDateTimePickerProps) {
  const { form } = useFormContext()
  const { showLabels = true, dateLabel = '日期', timeLabel = '时间' } = props

  return (
    <Wrapper {...props}>
      <FormField
        control={form.control}
        name={props.name}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <FormDateTimePickerBase
                value={field.value}
                onValueChange={field.onChange}
                disabled={form.formState.isSubmitting}
                showLabels={showLabels}
                dateLabel={dateLabel}
                timeLabel={timeLabel}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </Wrapper>
  )
}

interface FormDateTimePickerBaseProps {
  value?: string
  onValueChange?: (date: Date | undefined) => void
  disabled?: boolean
  showLabels?: boolean
  dateLabel?: string
  timeLabel?: string
  className?: string
}

function FormDateTimePickerBase({
  value,
  onValueChange,
  disabled = false,
  showLabels = true,
  dateLabel = '日期',
  timeLabel = '时间',
  className,
}: FormDateTimePickerBaseProps) {
  const [open, setOpen] = React.useState(false)
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(value ? new Date(value) : undefined)
  const [selectedTime, setSelectedTime] = React.useState<string>(
    value ? new Date(value).toTimeString().slice(0, 8) : '00:00:00',
  )

  // 当外部value变化时，同步内部状态
  React.useEffect(() => {
    if (value) {
      setSelectedDate(new Date(value))
      setSelectedTime(new Date(value).toTimeString().slice(0, 8))
    }
  }, [value])

  const handleDateTimeChange = React.useCallback((date: Date | undefined, time: string) => {
    if (date && time) {
      const [hours, minutes, seconds] = time.split(':').map(Number)
      const combinedDate = new Date(date)
      combinedDate.setHours(hours, minutes, seconds)
      onValueChange?.(combinedDate)
    }
    else if (date) {
      const [hours, minutes, seconds] = time.split(':').map(Number)
      const combinedDate = new Date(date)
      combinedDate.setHours(hours, minutes, seconds)
      onValueChange?.(combinedDate)
    }
    else {
      onValueChange?.(undefined)
    }
  }, [onValueChange])

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date)
    if (date) {
      handleDateTimeChange(date, selectedTime)
    }
    setOpen(false)
  }

  const handleTimeChange = (time: string) => {
    setSelectedTime(time)
    if (selectedDate) {
      handleDateTimeChange(selectedDate, time)
    }
  }

  return (
    <div className={cn('flex gap-4 items-center w-full', className)}>
      <div className="flex items-center gap-3">
        {showLabels && (
          <Label className="px-1 text-sm font-medium shrink-0">
            {dateLabel}
          </Label>
        )}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-[120px] font-normal"
              disabled={disabled}
            >
              {selectedDate ? selectedDate.toLocaleDateString() : '选择日期'}
              <ChevronDownIcon className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start">
            <Calendar
              mode="single"
              selected={selectedDate}
              captionLayout="dropdown"
              onSelect={handleDateSelect}
              disabled={disabled}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex items-center gap-3">
        {showLabels && (
          <Label className="px-1 text-sm font-medium shrink-0">
            {timeLabel}
          </Label>
        )}
        <Input
          type="time"
          step="1"
          value={selectedTime}
          onChange={e => handleTimeChange(e.target.value)}
          disabled={disabled}
          className="w-[120px] bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
        />
      </div>
    </div>
  )
}
