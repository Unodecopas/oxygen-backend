import jwt from 'jsonwebtoken'
import 'dotenv/config'

export const login = (username: string, password: string): string | undefined => {
  if (username !== 'Jesus' || password !== 'admin') return undefined
  const token = jwt.sign(username, process.env.JWTSECRETWORD)

  return token
}
