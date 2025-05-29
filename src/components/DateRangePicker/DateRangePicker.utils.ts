import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isAfter,
  isBefore,
  addMonths,
  subMonths,
  isToday,
  isBefore as isBeforeDate,
} from 'date-fns'
import { enUS } from 'date-fns/locale'

export interface DateRange {
  startDate: Date | null
  endDate: Date | null
}

export const isDateInRange = (date: Date, selectedRange: DateRange): boolean => {
  if (!selectedRange.startDate || !selectedRange.endDate) return false
  return isAfter(date, selectedRange.startDate) && isBefore(date, selectedRange.endDate)
}

export const isDateSelected = (date: Date, selectedRange: DateRange): boolean => {
  return Boolean(
    (selectedRange.startDate && isSameDay(date, selectedRange.startDate)) ||
      (selectedRange.endDate && isSameDay(date, selectedRange.endDate)),
  )
}

export const isStartDate = (date: Date, selectedRange: DateRange): boolean => {
  return selectedRange.startDate ? isSameDay(date, selectedRange.startDate) : false
}

export const isEndDate = (date: Date, selectedRange: DateRange): boolean => {
  return selectedRange.endDate ? isSameDay(date, selectedRange.endDate) : false
}

export const isPastDate = (date: Date): boolean => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return isBeforeDate(date, today)
}

export const getCalendarDays = (currentMonth: Date) => {
  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 }) // Domingo
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 })

  return eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd,
  })
}

export const formatMonthYear = (date: Date): string => {
  return format(date, 'MMMM yyyy', { locale: enUS })
}

export const formatDay = (date: Date): string => {
  return format(date, 'd')
}

export const getPreviousMonth = (currentMonth: Date): Date => {
  return subMonths(currentMonth, 1)
}

export const getNextMonth = (currentMonth: Date): Date => {
  return addMonths(currentMonth, 1)
}

export const getWeekdays = () => {
  const days = []
  const baseDate = new Date(2023, 0, 1) // Base date for consistent weekday names
  for (let i = 0; i < 7; i++) {
    const date = new Date(baseDate)
    date.setDate(baseDate.getDate() + i)
    days.push(format(date, 'EEE', { locale: enUS }))
  }
  return days
}

export const weekdays = getWeekdays()

export const isDateSelectable = (date: Date): boolean => {
  return !isPastDate(date)
}

export const formatDateRange = (range: DateRange): string => {
  const { startDate, endDate } = range
  if (!startDate && !endDate) return ''
  if (startDate && endDate) {
    return `From ${format(startDate, 'MMM d, yyyy')} to ${format(endDate, 'MMM d, yyyy')}`
  }
  if (startDate) {
    return `From ${format(startDate, 'MMM d, yyyy')} - Select end date`
  }
  return ''
}

export { isSameMonth, isToday }
