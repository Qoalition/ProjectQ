const express = require('express')
const router = express.Router();
const db = require('../db/questions')
const { addQuestion } = require('../blockchain/middleware/rootContractMiddleware');
const { upVoteQuestion } = require('../blockchain/middleware/questionContractMiddleware');

router.get("/get", db.getAllQuestions);

router.post("/create", db.createQuestion, addQuestion, db.saveQuestionAddress, (req, res) => {
  res.status(200).json(res.locals.response)
});

router.post("/upvote", db.upvoteQuestion, upVoteQuestion, (req, res) => {
  res.status(200).json(res.locals.response);
});

router.post("/downvote", db.downvoteQuestion);

router.post("/getFullDetails", db.getFullQuestionInfo);

router.post("/getByTopic", db.getQuestionsByTopic);

router.post("/getUniqueTopics", db.getUniqueQuestionTopics);

router.get("/createcontract", /* create question contract */);

module.exports = router