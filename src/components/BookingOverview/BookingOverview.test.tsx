import { render, screen } from '@testing-library/react'
import { mockedBike } from 'mocks/Bike'
import { SERVICE_FEE_PERCENTAGE } from '../../components/BookingOverview/BookingOverview.constants'
import { getServicesFee } from '../../components/BookingOverview/BookingOverview.utils'
import BookingOverviewContainer from './BookingOverview.container'

describe('BookingOverviewContainer', () => {
  beforeEach(() => {
    render(<BookingOverviewContainer rateByDay={mockedBike.rate} />)
  })

  it('should has the overview container with the prices, total and booking button', () => {
    const overviewContainerElement = screen.getByTestId('bike-overview-container')
    expect(overviewContainerElement).toBeInTheDocument()

    const pricesElements = screen.getAllByTestId('bike-overview-single-price')
    expect(pricesElements).not.toBeNull()
    expect(pricesElements.length).toBe(2)

    const totalElement = screen.getByTestId('bike-overview-total')
    expect(totalElement).toBeInTheDocument()

    const bookingButtonElement = screen.getByTestId('bike-booking-button')
    expect(bookingButtonElement).toBeInTheDocument()
  })
})

describe('BookingOverview utils', () => {
  it('should gets the services fee properly', () => {
    const amount = 100
    const expectedAmount = amount * SERVICE_FEE_PERCENTAGE

    const result = getServicesFee(amount)
    expect(result).toEqual(expectedAmount)
  })
})
