import bookingsData from '../data/bookings.json'
import { Booking, NewBooking } from '../types/types'

const bookings: Booking[] = bookingsData as Booking[]

export const getBookings = (): Booking[] => bookings

export const getBooking = (id: number): Booking | undefined => {
  const bookingEntry = bookings.find(booking => booking.id === id)
  return bookingEntry
}

export const createBooking = (object: NewBooking): Booking => {
  const id = Math.max(...bookings.map(booking => booking.id)) + 1
  return ({ id, ...object })
}

export const updateBooking = (object: NewBooking, id: number): Booking | undefined => {
  const bookingEntry = bookings.find(booking => booking.id === id)
  if (bookingEntry === undefined) return undefined
  return { id, ...object }
}
