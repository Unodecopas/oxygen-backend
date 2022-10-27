import jwt from 'jsonwebtoken'
import 'dotenv/config'

const secretWord = (process.env.JWTSECRETWORD !== undefined) ? process.env.JWTSECRETWORD : 'secret'

export const login = (username: string, password: string): string | undefined => {
  if (username !== 'Jesus' || password !== 'admin') return undefined
  const token = jwt.sign(username, secretWord)

  return token
}
