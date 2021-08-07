const db = require('./db')

const createAnswer = (request, response, next) => {
  const { answer, question_id, user_id } = request.body

  // Create an answer to a question from a given user
  const createAnswerQuery =
    `INSERT INTO answers(answer, question_id, user_id) \
      VALUES ('${answer}', ${question_id}, ${user_id}) \
      RETURNING answer_id`

  // Need to grab the question id of the answer so we can reference it correctly in the blockchain
  const getAnswerAddress =
    `SELECT question_bc_address FROM questions \
      WHERE question_id = ${question_id}`

  db.query(createAnswerQuery, (error, results) => {
    if (error) {
      response.status(400).json(error)
      return;
    }

    // Store the response and answerId for the blockchain middleware
    response.locals.response = results.rows[0];
    response.locals.answerId = results.rows[0].answer_id;

    db.query(getAnswerAddress, (error, results) => {
      response.locals.address = results.rows[0].question_bc_address
      next();
    });
  })
}

const saveAnswerAddress = (request, response, next) => {
  const saveAnswerAddressQuery =
    `UPDATE answers SET answer_bc_address = '${response.locals.answerAddress}' \
      WHERE answer_id = ${response.locals.answerId}`

  db.query(saveAnswerAddressQuery, (error, results) => {
    if (error) return response.status(400).json(error);
    next();
  })
}

const upvoteAnswer = (request, response, next) => {
  const { answer_id } = request.body

  // Upvote an answer by answerID
  // Will have to consider overflow... but not now :)
  const upvoteAnswerQuery =
    `UPDATE answers \
      SET num_upvotes = num_upvotes + 1 \
        WHERE answer_id = ${answer_id} \
      RETURNING num_upvotes, answer_bc_address`

  db.query(upvoteAnswerQuery, (error, results) => {
    if (error) {
      response.status(400).json(error)
      return;
    }

    // Store the response and answerId for the blockchain middleware
    response.locals.response = results.rows[0];
    response.locals.address = results.rows[0].answer_bc_address;
    next();
  })
}

const downvoteAnswer = (request, response, next) => {
  const { answer_id } = request.body

  // Downvote an answer by answer_id (increase number of downvotes by 1)
  const downvoteAnswerQuery =
    `UPDATE answers \
      SET num_downvotes = num_downvotes + 1 \
        WHERE answer_id = ${answer_id} \
      RETURNING num_downvotes, answer_bc_address`

  db.query(downvoteAnswerQuery, (error, results) => {
    if (error) {
      response.status(400).json(error)
      return;
    }

    response.locals.response = results.rows[0];
    response.locals.address = results.rows[0].answer_bc_address;
    next();
  })
}

module.exports = {
  createAnswer,
  upvoteAnswer,
  downvoteAnswer,
  saveAnswerAddress
}