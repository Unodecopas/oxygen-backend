import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt'

const secretWord = (process.env.JWTSECRETWORD !== undefined) ? process.env.JWTSECRETWORD : 'secret'

const opts: StrategyOptions = {
  secretOrKey: secretWord,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

export default new Strategy(opts, (payload, done) => {
  const user = payload
  if (user !== undefined) return done(null, user)
  return done(null, false)
}
)
