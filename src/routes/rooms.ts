import express from 'express'
import { getRooms, getRoom, createRoom, updateRoom } from '../controllers/roomsControllers'
const router = express.Router()

router.get('/', getRooms)
router.get('/:id', getRoom)
router.post('/', createRoom)
router.patch('/:id', updateRoom)

export default router
