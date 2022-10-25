import { BookingStatus, ReviewStatus } from './enums'

export interface Review {
  id: number
  date: string
  customer: string
  email: string
  phone: string
  comment: string
  subject: string
  status: ReviewStatus
}

export type NewReview = Omit<Review, 'id'>

export interface Booking {
  id: number
  guestName: string
  orderDate: string
  checkin: string
  checkout: string
  request: string
  roomType: string
  status: BookingStatus
}
export type NewBooking = Omit<Booking, 'id'>

export interface Room {
  id: number
  photos: string[]
  roomType: string
  roomNumber: string
  description: string
  offer: boolean
  price: number
  discount: number
  cancellation: string
  amenities: string[]
}
export type NewRoom = Omit<Room, 'id'>
