import express from 'express'
import bookingsData from '../data/bookings.json'
import { Booking } from '../types/types'

const router = express.Router()

const bookingsList: Booking[] = bookingsData as Booking[]

router.get('/', (_, res) => res.send(bookingsList))

router.post('/', (req, res) => {
  const id = Math.max(...bookingsList.map(booking => booking.id)) + 1
  const newBooking = { id, ...req.body }
  bookingsList.push(newBooking)
  res.send(newBooking)
})

router.get('/:id', (req, res, next) => {
  const booking = bookingsList.find(booking => booking.id === Number(req.params.id))
  if (booking === undefined) next()
  res.send(booking)
})

router.patch('/:id', (req, res, next) => {
  const index = bookingsList.findIndex(booking => booking.id === Number(req.params.id))

  if (index === -1) {
    next()
  } else {
    bookingsList[index] = { id: bookingsList[index].id, ...req.body }
    res.send(bookingsList[index])
  }
})

router.delete('/:id', (req, res) => {
  const index = bookingsList.findIndex(booking => booking.id === Number(req.params.id))
  bookingsList.splice(index, 1)
  res.send({ message: `Room ${req.params.id} delete succesfully` })
})

export default router
