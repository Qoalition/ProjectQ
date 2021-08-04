const db = require('./db')
const { contract } = require('../config')

const getAllQuestions = (request, response) => {
  // const getAllQuestionsQuery =
  //   'SELECT * \
  //     FROM questions \
  //     ORDER BY question_id ASC'

  const getAllQuestionsQuery =
    'FROM questions \
      INNER JOIN users ON questions.user_id=users.user_id \
      INNER JOIN answers ON questions.user_id=answers.user_id'

  db.query(getAllQuestionsQuery, (error, results) => {
    if (error) {
      throw error
    }
    console.log("DEBUG :: getAllQuestions => ", results.rows)
    response.status(200).json(results.rows)
  })
}

const createQuestion = (request, response) => {
  const { question, user_id, topic } = request.body

  const createQuestionQuery =
    `INSERT INTO questions(question, user_id, topic) \
      VALUES ('${question}', ${user_id}, '${topic}') \
      RETURNING question_id`

  db.query(createQuestionQuery, (error, results) => {
    if (error) {
      throw error
    }
    console.log("DEBUG :: results => ", results.rows[0].question_id)

    //contract.createQuestion(results.rows[0].question_id)

    response.status(200).json(results.rows)
  })
}

// get unique entries of topic column in question table

module.exports = {
  getAllQuestions,
  createQuestion,
}
