
import app from './app'
import 'dotenv/config'

const PORT = !isNaN(process.env.PORT) ? process.env.PORT : 4000

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})
