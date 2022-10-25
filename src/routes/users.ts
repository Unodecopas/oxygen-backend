import express from 'express'
import { login } from '../controllers/usersControllers'

const router = express.Router()

router.post('/login', login)

export default router
