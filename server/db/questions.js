const db = require('./db')

const getAllQuestions = (request, response) => {
  const getAllQuestionsQuery =
    `SELECT *, (SELECT count(*)::int FROM answers WHERE question_id=questions.question_id) as answer_count \ 
      FROM questions \
      INNER JOIN users ON questions.user_id=users.user_id \
      ORDER BY questions.question_id DESC`;

  db.query(getAllQuestionsQuery, (error, results) => {
    if (error) {
      response.status(400).json(error)
      return;
    }

    response.status(200).json(results.rows)
  })
}

const createQuestion = (request, response, next) => {
  const { question, question_description, topic, user_id } = request.body
  const createQuestionQuery =
    `INSERT INTO questions(question, question_description, topic, user_id) \
      VALUES ('${question}', E'${question_description}', '${topic}', ${user_id}) \
      RETURNING question_id`

  db.query(createQuestionQuery, (error, results) => {
    if (error) {
      response.status(400).json(error)
      return;
    }

    // Store the response and question ID for the blockchain middleware
    response.locals.response = results.rows[0];
    response.locals.questionId = results.rows[0].question_id;
    next();
  })
}

const saveQuestionAddress = (request, response, next) => {
  const saveQuestionAddressQuery =
    `UPDATE questions SET question_bc_address = '${response.locals.questionAddress}' \
      WHERE question_id = ${response.locals.questionId}`

  db.query(saveQuestionAddressQuery, (error, results) => {
    if (error) return response.status(400).json(error);
    next();
  })
}

const upvoteQuestion = (request, response, next) => {
  const { question_id } = request.body
  console.log(request.body)

  // Upvote a question by question ID
  // Will have to consider overflow... but not now :)
  const upvoteQuestionQuery =
    `UPDATE questions
      SET num_upvotes = num_upvotes + 1
        WHERE question_id = ${question_id}
      RETURNING num_upvotes, question_bc_address`

  db.query(upvoteQuestionQuery, (error, results) => {
    if (error) {
      response.status(400).json(error)
      return;
    }

    // Store the response and question blockchain address for the blockchain middleware
    response.locals.response = results.rows[0];
    response.locals.address = results.rows[0].question_bc_address;
    next();
  })
}

const downvoteQuestion = (request, response, next) => {
  const { question_id } = request.body

  // Downvote a question by question id
  const downvoteQuestionQuery =
    `UPDATE questions
      SET num_downvotes = num_downvotes + 1
        WHERE question_id = ${question_id}
      RETURNING num_upvotes, question_bc_address`

  db.query(downvoteQuestionQuery, (error, results) => {
    if (error) {
      response.status(400).json(error)
      return;
    }

    // Store the response and question blockchain address for the blockchain middleware
    response.locals.response = results.rows[0];
    response.locals.address = results.rows[0].question_bc_address;
    next();
  })
}

const getFullQuestionInfo = (request, response) => {
  const { question_id } = request.body

  // Get a single question + the user who created the question + all the answer of that question
  const getFullQuestionInfoQuery =
    `SELECT * FROM questions
      INNER JOIN users
        ON questions.user_id = users.user_id
      INNER JOIN answers
        ON questions.user_id = answers.answer_id
      WHERE questions.question_id = ${question_id}`

  db.query(getFullQuestionInfoQuery, (error, results) => {
    if (error) {
      response.status(400).json(error)
      return;
    }

    response.status(200).json(results.rows)
  })
}

const getQuestionsByTopic = (request, response) => {
  const { topic } = request.body
  console.log(request.body)
  // Get all the questions of a specific topic
  const getQuestionsByTopicQuery =
    `SELECT * FROM questions
     INNER JOIN users
        ON questions.user_id = users.user_id
     WHERE topic = '${topic}'
     ORDER BY questions.question_id DESC`

  db.query(getQuestionsByTopicQuery, (error, results) => {
    if (error) {
      response.status(400).json(error)
      return;
    }

    response.status(200).json(results.rows)
  })
}

const getUniqueQuestionTopics = (request, response) => {
  // Get all unique topics of questions
  const getQuestionsByTopicQuery =
    `SELECT topic, Count(topic) As theCount 
      FROM questions
      GROUP BY topic
      ORDER BY thecount DESC`

  db.query(getQuestionsByTopicQuery, (error, results) => {
    if (error) {
      response.status(400).json(error)
      return;
    }

    response.status(200).json(results.rows)
  })
}

module.exports = {
  getAllQuestions,
  createQuestion,
  upvoteQuestion,
  downvoteQuestion,
  getFullQuestionInfo,
  getQuestionsByTopic,
  getUniqueQuestionTopics,
  saveQuestionAddress,
}
