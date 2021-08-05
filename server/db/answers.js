const db = require('./db')

const createAnswer = (request, response) => {
  const { answer, question_id, user_id } = request.body

  // Create an answer to a question from a given user
  const createAnswerQuery =
    `INSERT INTO answers(answer, question_id, user_id) \
      VALUES ('${answer}', ${question_id}, ${user_id}) \
      RETURNING answer_id`

  db.query(createAnswerQuery, (error, results) => {
    if (error) {
      response.status(400).json(error)
      return;
    }
    console.log("DEBUG :: answers => ", results.rows[0].answer_id)

    //contract.createAnswer(results.rows[0].answer_id)

    response.status(200).json(results.rows)
  })
}

const upvoteAnswer = (request, response) => {
  const { answer_id } = request.body

  // Upvote an answer by answerID
  // Will have to consider overflow... but now now :)
  const upvoteAnswerQuery =
    `UPDATE answers
      SET num_upvotes = num_upvotes + 1
        WHERE answer_id = ${answer_id}`

  db.query(upvoteAnswerQuery, (error, results) => {
    if (error) {
      response.status(400).json(error)
      return;
    }

    console.log("DEBUG :: Success : upvoteAnswer => ", results.rows[0].answer_id)

    //contract.upvoteAnswer(...)

    response.status(200).json(results.rows)
  })
}

const downvoteAnswer = (request, response) => {
  const { answer_id } = request.body

  // Downvote an answer by answer_id
  const downvoteAnswerQuery =
    `UPDATE answers
      SET num_upvotes = num_upvotes - 1
        WHERE answer_id = ${answer_id}
        AND num_upvotes > 0`

  db.query(downvoteAnswerQuery, (error, results) => {
    if (error) {
      response.status(400).json(error)
      return;
    }

    console.log("DEBUG :: Success : downvoteAnswer => ", results.rows[0].answer_id)

    //contract.downvoteAnswer(...)

    response.status(200).json(results.rows)
  })
}

module.exports = {
  createAnswer,
  upvoteAnswer,
  downvoteAnswer
}