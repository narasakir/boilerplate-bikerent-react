import React from 'react'
import { Typography, Button, Box } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { useNavigate } from 'react-router-dom'
import Bike from 'models/Bike'

interface BookingSuccessProps {
  bike?: Bike
  bookingDetails?: {
    rentAmount: number
    fee: number
    totalAmount: number
  }
  onGoToHome?: () => void
  showButton?: boolean
}

const BookingSuccess: React.FC<BookingSuccessProps> = ({
  bike,
  bookingDetails,
  onGoToHome,
  showButton = true,
}) => {
  const navigate = useNavigate()

  const handleGoToHome = () => {
    if (onGoToHome) {
      onGoToHome()
    } else {
      navigate('/')
    }
  }

  return (
    <Box textAlign='center'>
      <CheckCircleIcon
        sx={{
          fontSize: 64,
          color: 'success.main',
          marginBottom: 2,
        }}
      />

      <Typography variant='h4' fontWeight={600} marginBottom={1}>
        Thank You!
      </Typography>

      <Typography variant='body1' color='text.secondary' marginBottom={3}>
        Your bike has been successfully booked.
      </Typography>

      {bike && (
        <Box
          sx={{
            backgroundColor: 'grey.50',
            borderRadius: 2,
            padding: 2,
            marginBottom: 3,
          }}
        >
          {bike.imageUrls?.[0] && (
            <Box
              component='img'
              src={bike.imageUrls[0]}
              alt={bike.name}
              sx={{
                width: '100%',
                maxWidth: 200,
                height: 120,
                objectFit: 'cover',
                borderRadius: 1,
                marginBottom: 2,
              }}
            />
          )}
          <Typography variant='h6' fontWeight={600}>
            {bike.name}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {bike.type}
          </Typography>
        </Box>
      )}

      {bookingDetails && (
        <Box sx={{ textAlign: 'left', marginBottom: showButton ? 3 : 0 }}>
          <Typography variant='h6' marginBottom={1}>
            Booking Summary
          </Typography>
          <Box display='flex' justifyContent='space-between' marginBottom={0.5}>
            <Typography variant='body2'>Rent Amount:</Typography>
            <Typography variant='body2'>€{bookingDetails.rentAmount.toFixed(2)}</Typography>
          </Box>
          <Box display='flex' justifyContent='space-between' marginBottom={0.5}>
            <Typography variant='body2'>Service Fee:</Typography>
            <Typography variant='body2'>€{bookingDetails.fee.toFixed(2)}</Typography>
          </Box>
          <Box
            display='flex'
            justifyContent='space-between'
            sx={{ borderTop: 1, borderColor: 'divider', paddingTop: 0.5 }}
          >
            <Typography variant='body1' fontWeight={600}>
              Total:
            </Typography>
            <Typography variant='body1' fontWeight={600}>
              €{bookingDetails.totalAmount.toFixed(2)}
            </Typography>
          </Box>
        </Box>
      )}

      {showButton && (
        <Button
          variant='contained'
          onClick={handleGoToHome}
          size='large'
          fullWidth
          sx={{ marginTop: 2 }}
        >
          Go to Home
        </Button>
      )}
    </Box>
  )
}

export default BookingSuccess
