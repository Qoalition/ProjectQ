const db = require('./db')

const createAnswer = (request, response) => {
  const { answer, question_id, user_id } = request.body

  const createAnswerQuery =
    `INSERT INTO answers(answer, question_id, user_id) \
      VALUES ('${answer}', ${question_id}, ${user_id}) \
      RETURNING answer_id`

  db.query(createAnswerQuery, (error, results) => {
    if (error) {
      throw error
    }
    console.log("DEBUG :: answers => ", results.rows[0].answer_id)

    //contract.createAnswer(results.rows[0].answer_id)

    response.status(200).json(results.rows)
  })
}

// upvote answer

// downvote answer

module.exports = {
  createAnswer
}