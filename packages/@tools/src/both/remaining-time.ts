import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns'

export function getRemainingTime(endAt: Date, now: Date = new Date()) {
  const days = differenceInDays(endAt, now)
  const hours = differenceInHours(endAt, now) % 24
  const minutes = differenceInMinutes(endAt, now) % 60
  const seconds = differenceInSeconds(endAt, now) % 60

  return { days, hours, minutes, seconds }
}
