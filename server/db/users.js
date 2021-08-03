const db = require('./db')

const getUsers = (request, response) => {
  const getUsersQuery =
    'SELECT * \
      FROM users \
      ORDER BY user_id ASC'

  db.query(getUsersQuery, (error, results) => {
    if (error) {
      throw error
    }
    console.log("DEBUG :: getUsers => : ", results.rows)
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
