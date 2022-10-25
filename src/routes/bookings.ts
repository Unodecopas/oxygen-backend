import express from 'express'
import { getBooking, getBookings, createBooking, updateBooking } from '../controllers/bookingsControllers'
const router = express.Router()

router.get('/', getBookings)
router.post('/', createBooking)
router.get('/:id', getBooking)
router.patch('/:id', updateBooking)

export default router
