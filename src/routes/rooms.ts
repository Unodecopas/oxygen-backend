/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import { addRoom, getRoom, getRooms, updateRoom } from '../controllers/roomsControllers'
import { dbQuery } from '../database/dbconfig'
import { roomSchema } from '../schemas/schemas'
import generateError from '../utils/generateError'

const router = express.Router()

router.get('/', async (_, res, next): Promise<void> => {
  try {
    const rooms = await getRooms()
    res.send(rooms)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next): Promise<void> => {
  try {
    await roomSchema.validateAsync(req.body)
    const response = await addRoom(req.body)

    if (response !== null) {
      const [newRoom] = await getRoom(response.insertId)
      res.send(newRoom)
    }
  } catch (error) {
    next(error)
  }
})
router.get('/:id', async (req, res, next): Promise<void> => {
  try {
    const [room] = await getRoom(Number(req.params.id))
    if (room === undefined) next()
    res.send(room)
  } catch (error) {
    next(error)
  }
})

router.patch('/:id', async (req, res, next): Promise<void> => {
  try {
    await roomSchema.validateAsync(req.body)
    const room = await getRoom(Number(req.params.id))
    if (room.length === 0) next()
    const response = await updateRoom(req.body, Number(req.params.id))
    if (response !== null) {
      const [updatedRoom] = await getRoom(Number(req.params.id))
      res.send(updatedRoom)
    }
  } catch (error) {
    next(error)
  }
})
router.delete('/:id', async (req, res, next): Promise<void> => {
  try {
    const room = await getRoom(Number(req.params.id))
    if (room.length === 0) throw generateError(404, 'Not found')
    await dbQuery('delete from contacts where id = ? ', [Number(req.params.id)])
    res.send({ message: `Delete contact ${req.params.id}` })
  } catch (error) {
    next(error)
  }
})

export default router
