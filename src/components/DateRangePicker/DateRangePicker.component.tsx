import React from 'react'
import { ChevronLeft, ChevronRight } from '@mui/icons-material'

import {
  CalendarContainer,
  MonthYearContainer,
  MonthYearText,
  NavigationContainer,
  NavigationButton,
  WeekdayHeader,
  DateButton,
  ClearButton,
  HeaderContainer,
  WeekdayGrid,
  DaysGrid,
} from './DateRangePicker.styles'

import {
  DateRange,
  isDateInRange,
  isDateSelected,
  isStartDate,
  isEndDate,
  isPastDate,
  getCalendarDays,
  formatMonthYear,
  formatDay,
  getPreviousMonth,
  getNextMonth,
  weekdays,
  isDateSelectable,
  isSameMonth,
  isToday,
} from './DateRangePicker.utils'

interface DateRangePickerComponentProps {
  currentMonth: Date
  selectedRange: DateRange
  onDateSelect: (date: Date) => void
  onMonthChange: (date: Date) => void
  onClearSelection: () => void
  disabled?: boolean
  className?: string
}

const DateRangePickerComponent: React.FC<DateRangePickerComponentProps> = ({
  currentMonth,
  selectedRange,
  onDateSelect,
  onMonthChange,
  onClearSelection,
  disabled = false,
  className,
}) => {
  const calendarDays = getCalendarDays(currentMonth)

  const handleDateClick = (date: Date) => {
    if (disabled) return

    if (!isDateSelectable(date)) return

    onDateSelect(date)
  }

  const handlePreviousMonth = () => {
    if (disabled) return
    onMonthChange(getPreviousMonth(currentMonth))
  }

  const handleNextMonth = () => {
    if (disabled) return
    onMonthChange(getNextMonth(currentMonth))
  }

  const hasSelection = selectedRange.startDate || selectedRange.endDate

  return (
    <CalendarContainer className={className}>
      <HeaderContainer>
        <MonthYearContainer>
          <MonthYearText>{formatMonthYear(currentMonth)}</MonthYearText>
          <NavigationContainer>
            <NavigationButton onClick={handlePreviousMonth} disabled={disabled} size='small'>
              <ChevronLeft />
            </NavigationButton>
            <NavigationButton onClick={handleNextMonth} disabled={disabled} size='small'>
              <ChevronRight />
            </NavigationButton>
          </NavigationContainer>
        </MonthYearContainer>
      </HeaderContainer>

      <WeekdayGrid>
        {weekdays.map((day) => (
          <WeekdayHeader key={day}>{day}</WeekdayHeader>
        ))}
      </WeekdayGrid>

      <DaysGrid>
        {calendarDays.map((date, index) => {
          const isCurrentMonth = isSameMonth(date, currentMonth)
          const isSelected = isDateSelected(date, selectedRange)
          const inRange = isDateInRange(date, selectedRange)
          const isStart = isStartDate(date, selectedRange)
          const isEnd = isEndDate(date, selectedRange)
          const isPast = isPastDate(date)
          const todayDate = isToday(date)

          return (
            <DateButton
              key={index}
              onClick={() => handleDateClick(date)}
              disabled={disabled || isPast}
              isSelected={isSelected}
              isInRange={inRange}
              isStartDate={isStart}
              isEndDate={isEnd}
              isCurrentMonth={isCurrentMonth}
              isToday={todayDate}
              isPast={isPast}
            >
              {formatDay(date)}
            </DateButton>
          )
        })}
      </DaysGrid>

      {hasSelection && (
        <ClearButton variant='outlined' onClick={onClearSelection} disabled={disabled} size='small'>
          Clear Selection
        </ClearButton>
      )}
    </CalendarContainer>
  )
}

export default DateRangePickerComponent
