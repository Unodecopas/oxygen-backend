import mysql from 'mysql'
import 'dotenv/config'
const { MYSQL_DATABASE, MYSQL_HOST, MYSQL_PASSWORD, MYSQL_USER } = process.env

const connection = mysql.createConnection({
  host: (MYSQL_HOST !== undefined) ? process.env.MYSQL_HOST : 'localhost',
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE
})

export async function dbQuery (query: string, params?: any[]): Promise<any[]> {
  return await new Promise((resolve, reject) => {
    connection.query(query, params, (error, results) => {
      if (error != null) { reject(error) }
      resolve(results)
    })
  })
}

export default connection
