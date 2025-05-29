import React, { useState } from 'react'
import DateRangePickerComponent from './DateRangePicker.component'
import DateRangePickerInput from './variants/DateRangePickerInput.component'
import { DateRange } from './'

export type DateRangePickerVariant = 'calendar' | 'input'

interface DateRangePickerContainerProps {
  onDateRangeChange?: (dateRange: DateRange) => void
  initialDateRange?: DateRange
  disabled?: boolean
  className?: string
  variant?: DateRangePickerVariant
}

const DateRangePickerContainer: React.FC<DateRangePickerContainerProps> = ({
  onDateRangeChange,
  initialDateRange = { startDate: null, endDate: null },
  disabled = false,
  className,
  variant = 'calendar',
}) => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date())
  const [selectedRange, setSelectedRange] = useState<DateRange>(initialDateRange)

  const handleDateSelect = (date: Date) => {
    let newRange: DateRange

    if (!selectedRange.startDate || (selectedRange.startDate && selectedRange.endDate)) {
      newRange = { startDate: date, endDate: null }
    } else if (selectedRange.startDate && !selectedRange.endDate) {
      if (date < selectedRange.startDate) {
        newRange = { startDate: date, endDate: selectedRange.startDate }
      } else {
        newRange = { startDate: selectedRange.startDate, endDate: date }
      }
    } else {
      newRange = { startDate: date, endDate: null }
    }

    setSelectedRange(newRange)
    onDateRangeChange?.(newRange)
  }

  const handleMonthChange = (date: Date) => {
    setCurrentMonth(date)
  }

  const handleClearSelection = () => {
    const clearedRange = { startDate: null, endDate: null }
    setSelectedRange(clearedRange)
    onDateRangeChange?.(clearedRange)
  }

  if (variant === 'input') {
    return (
      <DateRangePickerInput
        currentMonth={currentMonth}
        selectedRange={selectedRange}
        onDateSelect={handleDateSelect}
        onMonthChange={handleMonthChange}
        onClearSelection={handleClearSelection}
        disabled={disabled}
        className={className}
      />
    )
  }

  return (
    <DateRangePickerComponent
      currentMonth={currentMonth}
      selectedRange={selectedRange}
      onDateSelect={handleDateSelect}
      onMonthChange={handleMonthChange}
      onClearSelection={handleClearSelection}
      disabled={disabled}
      className={className}
    />
  )
}

export default DateRangePickerContainer
