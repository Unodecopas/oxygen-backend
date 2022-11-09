import { BookingStatus, ContactStatus, UserStatus } from '../enums'

export interface Contact {
  id: number
  date: string
  customer: string
  email: string
  phone: string
  comment: string
  subject: string
  status: ContactStatus
}

export type NewContact = Omit<Contact, 'id'>

export interface Booking {
  id: number
  guestName: string
  orderDate: string
  checkin: string
  checkout: string
  request: string
  roomID: number
  status: BookingStatus
}
export type NewBooking = Omit<Booking, 'id'>

export interface Room {
  id: number
  roomType: string
  roomNumber: string
  description: string
  offer: boolean
  price: number
  discount: number
  cancellation: string
}
export type NewRoom = Omit<Room, 'id'>

export interface User {
  id: number
  username: string
  photo: string
  email: string
  startDate: string
  job: string
  contact: string
  status: UserStatus
}
