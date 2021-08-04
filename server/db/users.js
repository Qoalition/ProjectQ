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
  const { username, password, walletId } = request.body;

  const createUserQuery =
    `INSERT INTO users(username, password, wallet_id) \
      VALUES ('${username}', '${password}', '${walletId}') \
      RETURNING user_id`

  db.query(createUserQuery, (error, results) => {
    if (error) {
      throw error
    }

    console.log("DEBUG :: createUser => ", results)

    response.status(200).json(results.rows)
  })
}

module.exports = {
  getUsers,
  createUser,
}
