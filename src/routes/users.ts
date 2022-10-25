import express from 'express'
import * as usersControllers from '../controllers/usersControllers'

const router = express.Router()

router.post('/login', (req, res) => {
  const { username, password } = req.body
  const token = usersControllers.login(username, password)
  if (token === undefined) return res.status(401).json({ message: 'Wrong username or password' })
  res.send({ token })
})

export default router
