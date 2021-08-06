const express = require("express");
const router = express.Router();
const {
  addQuestion,
  getQuestions,
  upVoteQuestion,
  getQuestionVotes,
} = require("../blockchain/helpers.js");

router.get("/getQuestions", getQuestions);
router.get("/addQuestion/:id", addQuestion);
router.get("/upVoteQuestion/:address", upVoteQuestion); // WIP
router.get("/getQuestionVotes/:address", getQuestionVotes) // WIP

module.exports = router;
