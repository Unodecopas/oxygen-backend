import roomsData from '../data/rooms.json'
import { NewRoom, Room } from '../types/types'

const rooms: Room[] = roomsData as Room[]

export const getRooms = (): Room[] => rooms

export const getRoom = (id: number): Room | undefined => {
  const room = rooms.find(room => room.id === id)
  return room
}
export const createRoom = (object: NewRoom): Room => {
  const id = Math.max(...roomsData.map(room => room.id)) + 1
  return ({ id, ...object })
}
export const updateRoom = (object: NewRoom, id: number): Room | undefined => {
  const updatedRoom = rooms.find(room => room.id === id)
  if (updatedRoom === undefined) return undefined
  return { id, ...object }
}
