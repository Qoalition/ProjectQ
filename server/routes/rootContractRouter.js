const express = require("express");
const router = express.Router();
const {
  addQuestion,
  getQuestions,
} = require("../blockchain/rootContractHelpers.js");

router.get("/getQuestions", getQuestions);
router.get("/addQuestion/:id", addQuestion);

module.exports = router;
