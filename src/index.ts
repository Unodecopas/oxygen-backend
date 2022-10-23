import express from 'express'
import 'dotenv/config'
import morgan from 'morgan'
import cors from 'cors'
import roomsRoutes from './routes/rooms'

const app = express()
app.use(express.json()) // transform req.body to JSON
app.use(morgan('dev'))
app.use(cors())
app.use('/rooms', roomsRoutes)

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
const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})
