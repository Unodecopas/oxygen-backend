import express from 'express'
import * as roomsControllers from '../controllers/roomsControllers'
const router = express.Router()

router.get('/', (_, res) => {
  const rooms = roomsControllers.getRooms()
  res.send(rooms)
})
router.post('/', (req, res) => {
  const newRoom = roomsControllers.createRoom(req.body)
  res.send(newRoom)
})
router.get('/:id', (req, res, next) => {
  const room = roomsControllers.getRoom(Number(req.params.id))
  if (room === undefined) next()
  res.send(room)
})
router.patch('/:id', (req, res) => {
  const updatedRoom = roomsControllers.updateRoom(req.body)
  res.send(updatedRoom)
})

export default router
