const express = require("express");
const router = express.Router();
const {
  addQuestion,
  getQuestions,
  upVoteQuestionByIndex,
  downVoteQuestionByIndex,
  upVoteQuestionByAddress,
} = require("../blockchain/helpers.js");

router.get("/getQuestions", getQuestions);
router.get("/addQuestion/:id", addQuestion);
router.get("/upVoteQuestionByIndex/:index", upVoteQuestionByIndex);
router.get("/downVoteQuestionByIndex/:index", downVoteQuestionByIndex);
router.get("/upVoteQuestionByAddress/:address", upVoteQuestionByAddress); // WIP

module.exports = router;