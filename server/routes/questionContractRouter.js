const express = require("express");
const router = express.Router();
const {
  upVoteQuestion,
  getQuestionVotes,
  downVoteQuestion,
  getAnswers,
  addAnswer
} = require("../blockchain/helpers/questionContractHelpers.js");


router.get("/upVoteQuestion/:address", upVoteQuestion);
router.get("/getQuestionVotes/:address", getQuestionVotes);
router.get("/downVoteQuestion/:address", downVoteQuestion);
router.get("/getAnswers/:address", getAnswers);
router.get("/addAnswer/:address/:id", addAnswer);

module.exports = router;
