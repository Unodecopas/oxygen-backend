import express from 'express'
import roomsData from '../data/rooms.json'
import { Room } from '../types/types'

const router = express.Router()

const roomsList: Room[] = roomsData as Room[]

router.get('/', (_, res) => res.send(roomsList))

router.post('/', (req, res) => {
  const id = Math.max(...roomsList.map(room => room.id)) + 1
  const newRoom = { id, ...req.body }
  roomsList.push(newRoom)
  res.send(newRoom)
})
router.get('/:id', (req, res, next) => {
  const room = roomsList.find(room => room.id === Number(req.params.id))
  if (room === undefined) next()
  res.send(room)
})

router.patch('/:id', (req, res, next) => {
  const index = roomsList.findIndex(room => room.id === Number(req.params.id))

  if (index === -1) {
    next()
  } else {
    roomsList[index] = { id: roomsList[index].id, ...req.body }
    res.send(roomsList[index])
  }
})
router.delete('/:id', (req, res) => {
  const index = roomsList.findIndex(room => room.id === Number(req.params.id))
  roomsList.splice(index, 1)
  res.send({ message: `Room ${req.params.id} delete succesfully` })
})

export default router
