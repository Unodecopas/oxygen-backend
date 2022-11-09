import { OkPacket } from 'mysql'
import { dbQuery } from '../database/dbconfig'
import { NewRoom, Room } from '../types/types'

export const getRooms = async (): Promise<Room[]> => {
  const rooms: Room[] = await dbQuery('select * from rooms')
  return rooms
}

export const getRoom = async (id: number): Promise<any> => {
  const room = await dbQuery('select * from rooms where id = ?', [id])
  return room
}

export const addRoom = async (room: NewRoom): Promise<any> => {
  const { roomType, roomNumber, description, offer, price, discount, cancellation } = room
  const response: OkPacket | any = await dbQuery(`
    insert into rooms
    ( roomType, roomNumber, description, offer, price, discount, cancellation)
    values
    (?)
  `, [[roomType, roomNumber, description, offer, price, discount, cancellation]])
  return response
}

export const updateRoom = async (room: NewRoom, id: number): Promise<any> => {
  const { roomType, roomNumber, description, offer, price, discount, cancellation } = room
  const response: OkPacket | any = await dbQuery(`
    update rooms set ? where id = ?
  `, [{ roomType, roomNumber, description, offer, price, discount, cancellation }, id])
  return response
}
