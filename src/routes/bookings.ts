import express from 'express'
import * as bookingsControllers from '../controllers/bookingsControllers'
const router = express.Router()

router.get('/', (_, res) => {
  const bookings = bookingsControllers.getBookings()
  res.send(bookings)
})
router.post('/', (req, res) => {
  const newBooking = bookingsControllers.createBooking(req.body)
  res.send(newBooking)
})
router.get('/:id', (req, res, next) => {
  const booking = bookingsControllers.getBooking(Number(req.params.id))
  if (booking === undefined) next()
  res.send(booking)
})
router.patch('/:id', (req, res) => {
  const updatedBooking = bookingsControllers.updateBooking(req.body)
  res.send(updatedBooking)
})

export default router
