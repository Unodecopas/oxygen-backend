/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import { addBooking, getBooking, getBookings, updateBooking } from '../controllers/bookingsControllers'
import { dbQuery } from '../database/dbconfig'
import { bookingSchema } from '../schemas/schemas'
import generateError from '../utils/generateError'

const router = express.Router()

router.get('/', async (_, res, next): Promise<void> => {
  try {
    const bookings = await getBookings()
    res.send(bookings)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next): Promise<void> => {
  try {
    await bookingSchema.validateAsync(req.body)
    const response = await addBooking(req.body)

    if (response !== null) {
      const [newBooking] = await getBooking(response.insertId)
      res.send(newBooking)
    }
  } catch (error) {
    next(error)
  }
})
router.get('/:id', async (req, res, next): Promise<void> => {
  try {
    const [booking] = await getBooking(Number(req.params.id))
    if (booking === undefined) next()
    res.send(booking)
  } catch (error) {
    next(error)
  }
})

router.patch('/:id', async (req, res, next): Promise<void> => {
  try {
    await bookingSchema.validateAsync(req.body)
    const booking = await getBooking(Number(req.params.id))
    if (booking.length === 0) next()
    const response = await updateBooking(req.body, Number(req.params.id))
    if (response !== null) {
      const [updatedRoom] = await getBooking(Number(req.params.id))
      res.send(updatedRoom)
    }
  } catch (error) {
    next(error)
  }
})
router.delete('/:id', async (req, res, next): Promise<void> => {
  try {
    const booking = await getBooking(Number(req.params.id))
    if (booking.length === 0) throw generateError(404, 'Not found')
    await dbQuery('delete from contacts where id = ? ', [Number(req.params.id)])
    res.send({ message: `Delete contact ${req.params.id}` })
  } catch (error) {
    next(error)
  }
})
export default router
