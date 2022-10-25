import roomsData from '../data/rooms.json'

const getRooms = (_req, res) => {
  res.send(roomsData)
}
const getRoom = (req, res) => {
  const [room] = roomsData.filter(room => room.id === Number(req.params.id))
  if (!room) return res.status(404).json({ message: 'Not Found' })
  res.send(room)
}
const createRoom = (req, res) => {
  const id = Math.max(...roomsData.map(room => room.id)) + 1
  res.send({ id, ...req.body })
}
const updateRoom = (req, res) => {
  res.send({ id: req.params.id, ...req.body })
}
export { getRooms, getRoom, createRoom, updateRoom }
