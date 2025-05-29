import apiClient from './api'

export interface BookingRequest {
  bikeId: number
  userId: number
  dateFrom: string
  dateTo: string
}

export interface BookingResponse {
  rentAmount: number
  fee: number
  totalAmount: number
}

export interface BookingError {
  errorType: string
  message: string
}

export const rentBike = async (bookingData: BookingRequest): Promise<BookingResponse> => {
  try {
    const response = await apiClient.post('/bikes/rent', bookingData)
    return response.data
  } catch (error: any) {
    if (error.response?.data) {
      throw error.response.data as BookingError
    }
    throw new Error('Failed to book bike')
  }
}
