import { Box, Typography, IconButton, Button, styled } from '@mui/material'

export const CalendarContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#1F49D1',
  borderRadius: '16px',
  padding: theme.spacing(3),
  color: 'white',
  margin: '0 auto 24px',
  width: '100%',
}))

export const HeaderContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '24px',
})

export const MonthYearContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  width: '100%',
  justifyContent: 'space-between',
})

export const NavigationContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
})

export const MonthYearText = styled(Typography)({
  fontSize: '28px',
  fontWeight: 600,
  color: 'white',
  textTransform: 'capitalize',
})

export const WeekdayGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
  width: '100%',
  gap: '4px',
  marginBottom: '8px',
})

export const WeekdayHeader = styled(Typography)({
  fontSize: '14px',
  fontWeight: 500,
  color: 'rgba(255, 255, 255, 0.8)',
  textAlign: 'center',
  padding: '8px 0',
})

export const DaysGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
  gap: '4px',
  width: '100%',
  placeItems: 'center',
})

export const DateButton = styled(Button)<{
  isSelected?: boolean
  isInRange?: boolean
  isStartDate?: boolean
  isEndDate?: boolean
  isCurrentMonth?: boolean
  isToday?: boolean
  isPast?: boolean
}>(({ isSelected, isInRange, isStartDate, isEndDate, isCurrentMonth, isToday, isPast }) => ({
  minWidth: '36px',
  width: '36px',
  height: '36px',
  borderRadius: '50%',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '14px',
  fontWeight: 500,
  padding: 0,
  color: isCurrentMonth ? 'white' : 'rgba(255, 255, 255, 0.4)',
  backgroundColor:
    isStartDate || isEndDate ? 'white' : isInRange ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
  border: isToday && !isSelected ? '2px solid rgba(255, 255, 255, 0.6)' : 'none',
  boxSizing: 'border-box',

  '&:hover': {
    backgroundColor: isPast
      ? 'transparent'
      : isStartDate || isEndDate
      ? 'rgba(255, 255, 255, 0.9)'
      : 'rgba(255, 255, 255, 0.1)',
  },

  '&:disabled': {
    color: 'rgba(255, 255, 255, 0.3)',
    backgroundColor: 'transparent',
    cursor: 'not-allowed',
  },

  ...(isStartDate || isEndDate
    ? {
        color: '#1976d2',
        fontWeight: 600,
      }
    : {}),
}))

export const NavigationButton = styled(IconButton)({
  color: 'white',
  padding: '8px',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
})

export const ClearButton = styled(Button)({
  color: 'white',
  borderColor: 'rgba(255, 255, 255, 0.5)',
  borderRadius: 12,
  marginTop: '16px',
  '&:hover': {
    borderColor: 'white',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
})

export const SelectButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.common.black,
  borderRadius: 12,
  padding: '18px 0',
  textTransform: 'none',
  fontWeight: 800,
  height: '48px',
  width: '100%',
  '&:hover': {
    backgroundColor: theme.palette.secondary.dark,
  },
  '&:disabled': {
    backgroundColor: theme.palette.grey[400],
    color: theme.palette.common.white,
  },
}))
