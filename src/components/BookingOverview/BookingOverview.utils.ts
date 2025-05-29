import { differenceInDays } from 'date-fns'
import { SERVICE_FEE_PERCENTAGE } from './BookingOverview.constants'
import { DateRange } from 'components/DateRangePicker'

export const getServicesFee = (amount: number): number =>
  Math.floor(amount * SERVICE_FEE_PERCENTAGE)

export const calculatePricing = ({ startDate, endDate }: DateRange, rateByDay: number) => {
  if (!startDate || !endDate) {
    return {
      subtotal: 0,
      serviceFee: 0,
      total: 0,
      numberOfDays: 0,
    }
  }

  const numberOfDays = differenceInDays(endDate, startDate) + 1
  const subtotal = numberOfDays * rateByDay
  const serviceFee = getServicesFee(subtotal)

  return {
    subtotal,
    serviceFee,
    total: subtotal + serviceFee,
    numberOfDays,
  }
}
