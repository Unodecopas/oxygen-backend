import express from 'express'

import morgan from 'morgan'
import cors from 'cors'
import roomsRoutes from './routes/rooms'
import bookingsRoutes from './routes/bookings'
import reviewsRoutes from './routes/reviews'

const app = express()
app.use(express.json()) // transform req.body to JSON
app.use(morgan('dev'))
app.use(cors())
app.use('/rooms', roomsRoutes)
app.use('/bookings', bookingsRoutes)
app.use('/reviews', reviewsRoutes)

app.get('/', (_, res) => {
  res.send('fetching data')
})

// errors 404
app.use((_, res) => {
  res.status(404).send({
    status: 'error',
    message: 'Not found'
  })
})

// middleware errors
app.use((error, _req, res, _next) => {
  res.status(error.httpStatus || 500).send({
    status: 'error',
    message: error.message
  })
})

export default app
