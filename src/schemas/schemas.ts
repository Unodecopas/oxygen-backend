import joi from 'joi'

export const contactSchema = joi.object({
  customer: joi.string().min(3).required(),
  email: joi.string().email().required(),
  phone: joi.string().min(6).max(10).required(),
  comment: joi.string().required(),
  subject: joi.string().required(),
  status: joi.string().valid('unread', 'published').required(),
  date: joi.date().required()
})

export const roomSchema = joi.object({
  roomType: joi.string().required().valid('Single Bed A -', 'Suite S -', 'Double Superior DS -', 'Double Bed D -'),
  roomNumber: joi.number().min(1).max(10).required(),
  description: joi.string().required(),
  offer: joi.boolean().required(),
  price: joi.number().min(100).required(),
  discount: joi.number().min(0).max(90).required(),
  cancellation: joi.string().required()
})

export const bookingSchema = joi.object({
  roomID: joi.number().required(),
  guestName: joi.string().required(),
  orderDate: joi.date().required(),
  checkin: joi.date().required(),
  checkout: joi.date().required(),
  request: joi.string().required(),
  status: joi.string().required().valid('inprogress', 'checkin', 'checkout')
})
