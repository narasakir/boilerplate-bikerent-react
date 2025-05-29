import React from 'react'
import {
  SwipeableDrawer,
  Box,
  Typography,
  IconButton,
  Divider,
  Alert,
  CircularProgress,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { BookingButton, PriceRow } from '../../BookingOverview.styles'
import DateRangePickerContainer, { DateRange } from 'components/DateRangePicker'
import { InfoIcon } from 'pages/BikeDetails/BikeDetails.styles'

interface BookingOverviewMobileProps {
  open: boolean
  onClose: () => void
  onOpen: () => void
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
  rateByDay: number
  bikeImage?: string
  bikeName?: string
}

const BookingOverviewMobile: React.FC<BookingOverviewMobileProps> = ({
  open,
  onClose,
  onOpen,
  currentPricing,
  isBookingReady,
  onDateRangeChange,
  onBooking,
  isBooking,
  bookingError,
  rateByDay,
  bikeImage,
  bikeName,
}) => {
  return (
    <SwipeableDrawer
      anchor='right'
      open={open}
      onClose={onClose}
      onOpen={onOpen}
      disableSwipeToOpen={false}
      ModalProps={{
        keepMounted: true,
      }}
      PaperProps={{
        sx: {
          width: '100vw',
          height: '100vh',
          padding: 2,
          borderRadius: 0,
        },
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Box display='flex' alignItems='center' marginBottom={1}>
          <IconButton onClick={onClose} size='large'>
            <ArrowBackIcon fontSize='large' />
          </IconButton>
          <Typography variant='h4' fontWeight={800} fontSize='36' marginLeft={1}>
            Booking
          </Typography>
        </Box>

        <Box
          display='flex'
          alignItems='center'
          padding={1}
          sx={{ borderRadius: 1, border: '1px solid #ccc' }}
        >
          {bikeImage && (
            <Box
              component='img'
              src={bikeImage}
              alt={bikeName || 'Bike'}
              sx={{
                width: 100,
                height: 100,
                objectFit: 'contain',
                marginRight: 2,
              }}
            />
          )}
          <Box flex={1}>
            <Typography variant='subtitle1' fontWeight={500}>
              {bikeName || 'Electric Bike'}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              €{rateByDay}/day
            </Typography>
          </Box>
        </Box>

        {/* Date Selection */}
        <Box>
          <Typography variant='h6' fontWeight={700} marginBottom={2}>
            Select Dates
          </Typography>
          <DateRangePickerContainer onDateRangeChange={onDateRangeChange} variant='input' />
        </Box>

        {/* Booking Overview */}
        <Box>
          <Typography variant='h6' fontWeight={700} marginBottom={1}>
            Booking Overview
          </Typography>

          <Divider />

          <PriceRow data-testid='bike-overview-single-price' marginTop={1.75}>
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
            <Typography variant='h6' fontSize={20} fontWeight={600}>
              {currentPricing.total.toFixed(2)} €
            </Typography>
          </PriceRow>
        </Box>

        <Box flex={1} />

        {bookingError && (
          <Alert severity='error' sx={{ marginBottom: 1 }}>
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
      </Box>
    </SwipeableDrawer>
  )
}

export default BookingOverviewMobile
