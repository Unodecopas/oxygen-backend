import { OkPacket } from 'mysql'
import { dbQuery } from '../database/dbconfig'
import { Booking, NewBooking } from '../types/types'

export const getBookings = async (): Promise<Booking[]> => {
  const bookings: Booking[] = await dbQuery('select * from bookings')
  return bookings
}

export const getBooking = async (id: number): Promise<any> => {
  const booking = await dbQuery('select * from bookings where id = ?', [id])
  return booking
}

export const addBooking = async (booking: NewBooking): Promise<any> => {
  const { roomID, guestName, orderDate, checkin, checkout, request, status } = booking
  const response: OkPacket | any = await dbQuery(`
    insert into bookings
    ( roomID, guestName, orderDate, checkin, checkout, request, status)
    values
    (?)
  `, [[roomID, guestName, orderDate, checkin, checkout, request, status]])
  return response
}

export const updateBooking = async (booking: NewBooking, id: number): Promise<any> => {
  const { roomID, guestName, orderDate, checkin, checkout, request, status } = booking
  const response: OkPacket | any = await dbQuery(`
    update bookings set ? where id = ?
  `, [{ roomID, guestName, orderDate, checkin, checkout, request, status }, id])
  return response
}
