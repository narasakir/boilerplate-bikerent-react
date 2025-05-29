import React from 'react'
import { BookingButton, OverviewContainer, PriceRow } from '../../BookingOverview.styles'
import { Typography, Divider, Box, Alert, CircularProgress } from '@mui/material'
import DateRangePickerContainer, { DateRange } from 'components/DateRangePicker'
import { InfoIcon } from 'pages/BikeDetails/BikeDetails.styles'
import { BookingSuccess } from 'components/BookingSuccess/'
import Bike from 'models/Bike'

interface BookingOverviewDesktopProps {
  currentPricing: {
    subtotal: number
    serviceFee: number
    total: number
    numberOfDays: number
  }
  isBookingReady: boolean
  onDateRangeChange: (dateRange: DateRange) => void
  onBooking: () => void
  isBooking: boolean
  bookingError: string | null
  bookingSuccess?: boolean
  bike?: Bike
  bookingDetails?: {
    rentAmount: number
    fee: number
    totalAmount: number
  }
}

const BookingOverviewDesktop: React.FC<BookingOverviewDesktopProps> = ({
  currentPricing,
  isBookingReady,
  onDateRangeChange,
  onBooking,
  isBooking,
  bookingError,
  bookingSuccess,
  bike,
  bookingDetails,
}) => {
  if (bookingSuccess) {
    return (
      <div>
        <OverviewContainer variant='outlined' data-testid='bike-overview-success'>
          <Box padding={3}>
            <BookingSuccess bike={bike} bookingDetails={bookingDetails} />
          </Box>
        </OverviewContainer>
      </div>
    )
  }

  return (
    <div>
      <OverviewContainer variant='outlined' data-testid='bike-overview-container'>
        <Typography variant='h2' fontSize={24} marginBottom={1.25}>
          Select Booking Dates
        </Typography>
        <DateRangePickerContainer onDateRangeChange={onDateRangeChange} />

        <Typography variant='h2' fontSize={16} marginBottom={1.25}>
          Booking Overview
        </Typography>

        <Divider />

        <PriceRow marginTop={1.75} data-testid='bike-overview-single-price'>
          <Box display='flex' alignItems='center'>
            <Typography marginRight={1}>Subtotal</Typography>
            <InfoIcon fontSize='small' />
          </Box>
          <Typography>{currentPricing.subtotal.toFixed(2)} €</Typography>
        </PriceRow>

        <PriceRow marginTop={1.5} data-testid='bike-overview-service-fee'>
          <Box display='flex' alignItems='center'>
            <Typography marginRight={1}>Service Fee</Typography>
            <InfoIcon fontSize='small' />
          </Box>
          <Typography>{currentPricing.serviceFee.toFixed(2)} €</Typography>
        </PriceRow>

        <PriceRow marginTop={1.75} data-testid='bike-overview-total'>
          <Typography fontWeight={800} fontSize={16}>
            Total
          </Typography>
          <Typography variant='h2' fontSize={24} letterSpacing={1}>
            {currentPricing.total.toFixed(2)} €
          </Typography>
        </PriceRow>

        {bookingError && (
          <Alert severity='error' sx={{ marginTop: 2 }}>
            {bookingError}
          </Alert>
        )}

        <BookingButton
          fullWidth
          disableElevation
          variant='contained'
          data-testid='bike-booking-button'
          disabled={!isBookingReady || isBooking}
          onClick={isBookingReady ? onBooking : undefined}
          sx={{
            opacity: isBookingReady && !isBooking ? 1 : 0.6,
            cursor: isBookingReady && !isBooking ? 'pointer' : 'not-allowed',
            marginTop: 2,
          }}
        >
          {isBooking ? (
            <Box display='flex' alignItems='center' gap={1}>
              <CircularProgress size={20} color='inherit' />
              Booking...
            </Box>
          ) : isBookingReady ? (
            'Add to booking'
          ) : (
            'Select dates to continue'
          )}
        </BookingButton>
      </OverviewContainer>
    </div>
  )
}

export default BookingOverviewDesktop
