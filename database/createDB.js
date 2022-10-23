import { getConnection } from './dbConfig.js'

let connection

async function main () {
  try {
    connection = await getConnection()
    console.log('Deleting tables...')
    await connection.query('drop table if exists bookings')
    await connection.query('drop table if exists rooms')
    await connection.query('drop table if exists users')
    console.log('Delete tables: OK')
  } catch (error) {
    console.log(error)
  } finally {
    console.log('Connection release')
    if (connection) connection.release()
  }
}

main().catch(Error)
