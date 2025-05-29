import React, { useMemo, useState } from 'react'
import { useMediaQuery, useTheme, Box, Button, Paper, Typography } from '@mui/material'
import { DateRange } from 'components/DateRangePicker'
import { calculatePricing, getServicesFee } from './BookingOverview.utils'
import BookingOverviewDesktop from './layout/desktop/BookingOverview.desktop'
import BookingOverviewMobile from './layout/mobile/BookingOverview.mobile'
import { BookingSuccessModal } from 'components/BookingSuccess'
import { rentBike, BookingResponse, BookingError } from 'services/bookingService'
import { format } from 'date-fns'
import Bike from 'models/Bike'
import { USER_ID } from './BookingOverview.constants'

interface BookingOverviewContainerProps {
  rateByDay: number
  bike?: Bike
}

const BookingOverviewContainer: React.FC<BookingOverviewContainerProps> = ({
  rateByDay = 0,
  bike,
}) => {
  const theme = useTheme()
  const isMobileScreen = useMediaQuery(theme.breakpoints.down('lg'))
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false)
  const [selectedDateRange, setSelectedDateRange] = useState<DateRange>({
    startDate: null,
    endDate: null,
  })
  const [currentPricing, setCurrentPricing] = useState({
    subtotal: rateByDay,
    serviceFee: getServicesFee(rateByDay),
    total: rateByDay + getServicesFee(rateByDay),
    numberOfDays: 1,
  })
  const [isBooking, setIsBooking] = useState(false)
  const [bookingSuccess, setBookingSuccess] = useState(false)
  const [bookingDetails, setBookingDetails] = useState<BookingResponse | null>(null)
  const [bookingError, setBookingError] = useState<string | null>(null)

  const handleDateRangeChange = (dateRange: DateRange) => {
    setSelectedDateRange(dateRange)
    setBookingError(null) // Clear any previous errors

    if (dateRange.startDate && dateRange.endDate) {
      const calculatedPricing = calculatePricing(dateRange, rateByDay)
      setCurrentPricing(calculatedPricing)
    } else {
      setCurrentPricing({
        subtotal: rateByDay,
        serviceFee: getServicesFee(rateByDay),
        total: rateByDay + getServicesFee(rateByDay),
        numberOfDays: 1,
      })
    }
  }

  const handleBooking = async () => {
    if (!bike || !selectedDateRange.startDate || !selectedDateRange.endDate) {
      return
    }

    setIsBooking(true)
    setBookingError(null)

    try {
      const bookingData = {
        bikeId: bike.id,
        userId: Number(USER_ID) || 1921,
        dateFrom: format(selectedDateRange.startDate, 'yyyy-MM-dd'),
        dateTo: format(selectedDateRange.endDate, 'yyyy-MM-dd'),
      }
      console.log('Booking data:', bookingData)
      const response = await rentBike(bookingData)
      setBookingDetails(response)
      setBookingSuccess(true)
      setMobileSheetOpen(false)
    } catch (error: any) {
      const bookingError = error as BookingError
      setBookingError(bookingError.message || 'Failed to book bike. Please try again.')
    } finally {
      setIsBooking(false)
    }
  }

  const handleOpenMobileSheet = () => {
    setMobileSheetOpen(true)
  }

  const handleCloseMobileSheet = () => {
    setMobileSheetOpen(false)
  }

  const handleCloseSuccessModal = () => {
    setBookingSuccess(false)
    setBookingDetails(null)
  }

  const isBookingReady = useMemo(
    () => !!(selectedDateRange.startDate && selectedDateRange.endDate),
    [selectedDateRange],
  )

  const sharedProps = {
    rateByDay,
    selectedDateRange,
    currentPricing,
    isBookingReady,
    bikeName: bike?.name,
    bikeImage: bike?.imageUrls?.[0] || '',
    onDateRangeChange: handleDateRangeChange,
    onBooking: handleBooking,
    isBooking,
    bookingError,
  }

  if (isMobileScreen) {
    return (
      <>
        <Box position='fixed' bottom={0} left={0} right={0} zIndex={1000} sx={{ padding: 0 }}>
          <Paper
            elevation={8}
            sx={{
              padding: 2,
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
              backgroundColor: 'white',
            }}
          >
            <Box display='flex' justifyContent='space-between' alignItems='center' marginBottom={1}>
              <Box>
                <Typography variant='body2' color='text.secondary'>
                  From €{rateByDay}/day
                </Typography>
                <Typography variant='h6' fontWeight={600}>
                  €{currentPricing.total.toFixed(2)} total
                </Typography>
              </Box>
              <Button
                variant='contained'
                size='large'
                onClick={handleOpenMobileSheet}
                data-testid='mobile-booking-button'
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  '&:hover': {
                    backgroundColor: theme.palette.primary.dark,
                  },
                  borderRadius: 2,
                  paddingX: 3,
                }}
              >
                Rent a bike
              </Button>
            </Box>
          </Paper>
        </Box>

        <BookingOverviewMobile
          {...sharedProps}
          open={mobileSheetOpen}
          onClose={handleCloseMobileSheet}
          onOpen={handleOpenMobileSheet}
        />

        <BookingSuccessModal
          open={bookingSuccess}
          onClose={handleCloseSuccessModal}
          bike={bike}
          bookingDetails={bookingDetails || undefined}
        />
      </>
    )
  }

  return (
    <BookingOverviewDesktop
      {...sharedProps}
      bookingSuccess={bookingSuccess}
      bike={bike}
      bookingDetails={bookingDetails || undefined}
    />
  )
}

export default BookingOverviewContainer
