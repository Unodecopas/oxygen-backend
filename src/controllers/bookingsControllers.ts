import bookingsData from '../data/bookings.json'

const getBookings = (_, res) => {
  res.send(bookingsData)
}

const getBooking = (req, res) => {
  const [booking] = bookingsData.filter(booking => booking.id === Number(req.params.id))
  if (!booking) return res.status(404).json({ message: 'Not Found' })
  res.send(booking)
}

const createBooking = (req, res) => {
  const id = Math.max(...bookingsData.map(booking => booking.id)) + 1
  res.send({ id, ...req.body })
}

const updateBooking = (req, res) => {
  res.send({ id: req.params.id, ...req.body })
}

export { getBooking, getBookings, createBooking, updateBooking }
