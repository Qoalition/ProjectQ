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
  const { username, password, wallet_id } = request.body;

  const createUserQuery =
    `INSERT INTO users(username, password, wallet_id) \
      VALUES ('${username}', '${password}', '${wallet_id}') \
      RETURNING user_id`

  db.query(createUserQuery, (error, results) => {
    if (error) {
      response.status(400).json(error)
      return;
    }

    console.log("DEBUG :: createUser => ", results)

    response.status(200).json(results.rows)
  })
}

module.exports = {
  getUsers,
  createUser,
}
