const express = require('express')
const router = express.Router();
const db = require('../db/questions')

router.get("/get", db.getAllQuestions);

router.post("/create", db.createQuestion);

router.post("/upvote", db.upvoteQuestion);

router.post("/downvote", db.downvoteQuestion);

router.post("/getFullDetails", db.getFullQuestionInfo);

router.post("/getByTopic", db.getQuestionsByTopic);

router.post("/getUniqueTopics", db.getUniqueQuestionTopics);

router.get("/createcontract", /* create question contract */);

module.exports = router