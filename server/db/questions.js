const db = require('./db')

const getAllQuestions = (request, response) => {
  const getAllQuestionsQuery =
    `SELECT *, (SELECT count(*) FROM answers WHERE question_id=questions.question_id) as answer_count \ 
      FROM questions \
      INNER JOIN users ON questions.user_id=users.user_id \
      ORDER BY questions.question_id DESC`;

      // LEFT JOIN answers \
      // ON questions.answers_count = COUNT() 

  db.query(getAllQuestionsQuery, (error, results) => {
    if (error) {
      response.status(400).json(error)
      return;
    }

    console.log("DEBUG :: Success : getAllQuestions => ", results.rows)
    response.status(200).json(results.rows)
  })
}

const createQuestion = (request, response) => {
  const { question, question_bc_address, user_id, topic } = request.body
  
  const createQuestionQuery =
    `INSERT INTO questions(question, question_bc_address, user_id, topic) \
      VALUES ('${question}', '${question_bc_address}', ${user_id}, '${topic}') \
      RETURNING question_id`

  db.query(createQuestionQuery, (error, results) => {
    if (error) {
      response.status(400).json(error)
      return;
    }

    console.log("DEBUG :: Success : createQuestion => ", results.rows[0].question_id)

    //contract.createQuestion(results.rows[0].question_id)

    response.status(200).json(results.rows)
  })
}

const upvoteQuestion = (request, response) => {
  const { question_id } = request.body

  // Upvote a question by question ID
  // Will have to consider overflow... but now now :)
  const upvoteQuestionQuery =
    `UPDATE questions
      SET num_upvotes = num_upvotes + 1
        WHERE question_id = ${question_id}`

  db.query(upvoteQuestionQuery, (error, results) => {
    if (error) {
      response.status(400).json(error)
      return;
    }

    console.log("DEBUG :: Success : upvoteQuestion => ", results.rows[0].question_id)

    //contract.upvoteQuestion(...)

    response.status(200).json(results.rows)
  })
}

const downvoteQuestion = (request, response) => {
  const { question_id } = request.body

  // Downvote a question by question id
  const downvoteQuestionQuery =
    `UPDATE questions
      SET num_upvotes = num_upvotes - 1
        WHERE question_id = ${question_id}
        AND num_upvotes > 0`

  db.query(downvoteQuestionQuery, (error, results) => {
    if (error) {
      response.status(400).json(error)
      return;
    }

    console.log("DEBUG :: Success : downvoteQuestion => ", results.rows[0].question_id)

    //contract.downvoteQuestion(...)

    response.status(200).json(results.rows)
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

    console.log("DEBUG :: Success : getFullQuestionInfo => ", results.rows[0].question_id)

    //contract.getFullQuestionInfo(...)

    response.status(200).json(results.rows)
  })
}

const getQuestionsByTopic = (request, response) => {
  const { topic } = request.body

  // Get all the questions of a specific topic
  const getQuestionsByTopicQuery =
    `SELECT * FROM questions
      WHERE topic = ${topic_id}`

  db.query(getQuestionsByTopicQuery, (error, results) => {
    if (error) {
      response.status(400).json(error)
      return;
    }

    console.log("DEBUG :: Success : getQuestionsByTopic => ", results.rows[0])

    //contract.getFullQuestionInfo(...)

    response.status(200).json(results.rows)
  })
}

const getUniqueQuestionTopics = (request, response) => {
  const { topic } = request.body

  // Get all unique topics of questions
  const getQuestionsByTopicQuery =
    `SELECT
      DISTINCT topic
    FROM questions`

  db.query(getQuestionsByTopicQuery, (error, results) => {
    if (error) {
      response.status(400).json(error)
      return;
    }

    console.log("DEBUG :: Success : getUniqueQuestionTopics => ", results.rows[0])

    //contract.getFullQuestionInfo(...)

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
  getUniqueQuestionTopics
}
