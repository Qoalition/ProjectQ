const express = require('express')
const router = express.Router();
const db = require('../db/answers')
const { addAnswer } = require('../blockchain/middleware/questionContractMiddleware');
const { upVoteAnswer, downVoteAnswer } = require('../blockchain/middleware/answerContractMiddleware');

router.post("/create", db.createAnswer, addAnswer, db.saveAnswerAddress, (req, res) => {
  res.status(200).json(res.locals.response)
});

router.post("/upvote", db.upvoteAnswer, upVoteAnswer, (req, res) => {
  res.status(200).json(res.locals.response)
});

router.post("/downvote", db.downvoteAnswer, downVoteAnswer, (req, res) => {
  res.status(200).json(res.locals.response)
});

module.exports = router
