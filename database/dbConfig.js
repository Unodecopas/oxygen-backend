import mysql from 'mysql2/promise'
import 'dotenv/config'

const { MYSQL_HOST, MYSQL_USER, MYSQL_PASS, MYSQL_DATABASE, MYSQL_PORT } = process.env

let pool
export async function getConnection () {
  if (!pool) {
    pool = mysql.createPool({
      host: MYSQL_HOST,
      user: MYSQL_USER,
      password: MYSQL_PASS,
      database: MYSQL_DATABASE,
      port: Number(MYSQL_PORT) || 3306,
      connectionLimit: 10,
      timezone: 'Z'
    })
  }
  return await pool.getConnection()
}
