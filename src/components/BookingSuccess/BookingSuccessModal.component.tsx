import React from 'react'
import { Dialog, DialogContent, DialogActions, Button, Box, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useNavigate } from 'react-router-dom'
import Bike from 'models/Bike'
import BookingSuccess from 'components/BookingSuccess/BookingSuccess.component'

interface BookingSuccessModalProps {
  open: boolean
  onClose: () => void
  bike?: Bike
  bookingDetails?: {
    rentAmount: number
    fee: number
    totalAmount: number
  }
}

const BookingSuccessModal: React.FC<BookingSuccessModalProps> = ({
  open,
  onClose,
  bike,
  bookingDetails,
}) => {
  const navigate = useNavigate()

  const handleGoToHome = () => {
    onClose()
    navigate('/')
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth='sm'
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          padding: 2,
        },
      }}
    >
      <Box display='flex' justifyContent='flex-end'>
        <IconButton onClick={onClose} size='small'>
          <CloseIcon />
        </IconButton>
      </Box>

      <DialogContent sx={{ paddingTop: 0 }}>
        <BookingSuccess
          bike={bike}
          bookingDetails={bookingDetails}
          onGoToHome={handleGoToHome}
          showButton={false}
        />
      </DialogContent>

      <DialogActions sx={{ justifyContent: 'center', paddingBottom: 2 }}>
        <Button variant='contained' onClick={handleGoToHome} size='large' sx={{ minWidth: 200 }}>
          Go to Home
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default BookingSuccessModal
