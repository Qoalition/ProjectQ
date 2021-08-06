const express = require("express");
const router = express.Router();
const {
  upVoteQuestion,
  getQuestionVotes,
} = require("../blockchain/questionContractHelpers.js");

router.get("/upVoteQuestion/:address", upVoteQuestion);
router.get("/getQuestionVotes/:address", getQuestionVotes);

module.exports = router;
