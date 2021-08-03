const db = require('./db')

const getAllQuestions = (request, response) => {
  const getAllQuestionsQuery =
    'SELECT * \
      FROM questions \
      ORDER BY question_id ASC'

  db.query(getAllQuestionsQuery, (error, results) => {
    if (error) {
      throw error
    }
    console.log("DEBUG :: getAllQuestions => ", results.rows)
    response.status(200).json(results.rows)
  })
}

const createQuestion = (request, response) => {
  let question_val = request.params.question.toString()
  let user_id = request.params.user_id

  const createQuestionQuery =
    `INSERT INTO questions(question, user_id) \
      VALUES ('${question_val}', ${user_id})`

  db.query(createQuestionQuery, (error, results) => {
    if (error) {
      throw error
    }
    console.log("DEBUG :: createQuestion => ", results.rows)
    response.status(200).json(results.rows)
  })
}

module.exports = {
  getAllQuestions,
  createQuestion,
}
