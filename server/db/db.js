const Pool = require('pg').Pool
const db = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'qoalition',
  password: 'psqlsu',
  port: 5432,
})

const getUsersQuery =
  'SELECT * \
    FROM users \
    ORDER BY user_id ASC'

const getUsers = (request, response) => {
  db.query(getUsersQuery, (error, results) => {
    if (error) {
      throw error
    }
    console.log("FINISHED : ", results.rows)
    response.status(200).json(results.rows)
  })
}

const createUser = (request, response) => {
  let walletId = request.params.walletId.toString()

  const createUserQuery =
    `INSERT INTO users(wallet_id) \
    VALUES (${walletId})`

  db.query(createUserQuery, (error, results) => {
    if (error) {
      throw error
    }
    console.log("DEBUG :: createUser => ", results.rows)
    response.status(200).json(results.rows)
  })
}

module.exports = {
  getUsers,
  createUser,
}