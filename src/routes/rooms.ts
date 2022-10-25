import express from 'express'
import { getRooms, getRoom, createRoom, updateRoom } from '../controllers/roomsControllers'
const router = express.Router()

router.get('/', getRooms)
router.post('/', createRoom)
router.get('/:id', getRoom)
router.patch('/:id', updateRoom)

export default router
