const express = require('express')
const router = express.Router();
const db = require('../db/answers')
const { addAnswer } = require('../blockchain/middleware/questionContractMiddleware');

router.post("/create", db.createAnswer, addAnswer, (req, res) => {
  res.status(200).json(res.locals.response)
});

router.post("/upvote", db.upvoteAnswer);

router.post("/downvote", db.downvoteAnswer);

module.exports = router