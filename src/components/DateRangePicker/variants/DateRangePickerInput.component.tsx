import React, { useState } from 'react'
import { Box, TextField, Drawer, InputAdornment, IconButton, Stack } from '@mui/material'
import { CalendarToday } from '@mui/icons-material'
import DateRangePickerComponent from '../DateRangePicker.component'
import { DateRange } from '..'
import { formatDateRange } from '../DateRangePicker.utils'
import { SelectButton } from '../DateRangePicker.styles'

interface DateRangePickerInputProps {
  currentMonth: Date
  selectedRange: DateRange
  onDateSelect: (date: Date) => void
  onMonthChange: (date: Date) => void
  onClearSelection: () => void
  disabled?: boolean
  className?: string
}

const DateRangePickerInput: React.FC<DateRangePickerInputProps> = ({
  currentMonth,
  selectedRange,
  onDateSelect,
  onMonthChange,
  onClearSelection,
  disabled = false,
  className,
}) => {
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    if (!disabled) {
      setOpen(true)
    }
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleDateSelectWithoutClose = (date: Date) => {
    onDateSelect(date)
  }

  const handleConfirm = () => {
    handleClose()
  }

  const isRangeComplete = selectedRange.startDate && selectedRange.endDate

  return (
    <Box className={className}>
      <TextField
        fullWidth
        placeholder='Select date range'
        value={formatDateRange(selectedRange)}
        onClick={handleClick}
        InputProps={{
          readOnly: true,
          startAdornment: (
            <InputAdornment position='start'>
              <IconButton onClick={handleClick} edge='start' disabled={disabled} color='primary'>
                <CalendarToday />
              </IconButton>
            </InputAdornment>
          ),
        }}
        disabled={disabled}
      />
      <Drawer
        anchor='bottom'
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            maxHeight: '80vh',
            backgroundColor: '#1F49D1',
          },
        }}
      >
        <Box>
          <DateRangePickerComponent
            currentMonth={currentMonth}
            selectedRange={selectedRange}
            onDateSelect={handleDateSelectWithoutClose}
            onMonthChange={onMonthChange}
            onClearSelection={onClearSelection}
            disabled={disabled}
          />

          <Stack justifyContent='space-between' padding={2}>
            <SelectButton variant='contained' onClick={handleConfirm} disabled={!isRangeComplete}>
              Select
            </SelectButton>
          </Stack>
        </Box>
      </Drawer>
    </Box>
  )
}

export default DateRangePickerInput
