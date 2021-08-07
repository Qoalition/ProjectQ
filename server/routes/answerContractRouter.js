const express = require("express");
const router = express.Router();
const {
  upVoteAnswer,
  downVoteAnswer,
  getAnswerVotes,
} = require("../blockchain/helpers/answerContractHelpers.js");

router.get("/downVoteAnswer/:address", downVoteAnswer);
router.get("/upVoteAnswer/:address", upVoteAnswer);
router.get("/getAnswerVotes/:address", getAnswerVotes);

module.exports = router;
