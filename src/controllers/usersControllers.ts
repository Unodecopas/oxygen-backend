import jwt from 'jsonwebtoken'

const login = (req, res) => {
  const { username, password } = req.body
  if (username !== 'Jesus' || password !== 'admin') return res.status(401).json({ message: 'Wrong username or password' })
  const tokenInfo = { username }
  const token = jwt.sign(tokenInfo, process.env.JWTSECRETWORD, { expiresIn: '30d' })

  res.send({ token })
}

export { login }
