import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import roomsRoutes from './routes/rooms'
import bookingsRoutes from './routes/bookings'
import contactsRoutes from './routes/contacts'
import usersRoutes from './routes/users'
import passport from 'passport'
import isAuth from './middlewares/isAuth'

const app = express()
app.use(express.json()) // transform req.body to JSON
app.use(morgan('dev'))
app.use(cors())
app.use(passport.initialize())
passport.use(isAuth)

app.use('/rooms', roomsRoutes)
app.use('/bookings', bookingsRoutes)
app.use('/contacts', contactsRoutes)
app.use('/users', usersRoutes)

app.get('/', express.static('public'))
app.get('/private', passport.authenticate('jwt', { session: false }), (_req, res) => {
  res.send({ message: 'ok' })
})

// errors 404
app.use((_req, res) => {
  res.status(404).send({
    status: 'error',
    message: 'Not Found'
  })
})

app.use((error: any, _req: any, res: any, _next: any) => {
  res.status((error.httpStatus !== undefined) ? error.httpStatus : 500).send({
    status: 'error',
    message: error.message
  })
})

export default app
