"use strict";
var next = require("next");
const express = require("express");
const bodyParser = require("body-parser");
// var express = require('express-observer');
const { contract } = require("./config");
const Web3 = require("web3");
var dev = process.env.NODE_ENV !== "production";
var app = next({ dev: dev });
const { abi } = require("../build/contracts/RootQuestionsContract.json");
const {
  addQuestion,
  getQuestions,
  upVoteQuestionByIndex,
  downVoteQuestionByIndex,
  upVoteQuestionByAddress,
} = require("./blockchain/helpers.js");

app.prepare().then(function () {
  var server = express();

  server.use(bodyParser.json());

  server.use("/users", require("./routes/users"));
  server.use("/questions/", require("./routes/questions"));
  server.get("/test/addQuestion", addQuestion);
  server.get("/test/getQuestions", getQuestions);
  server.get("/test/upVoteQuestionByIndex/:index", upVoteQuestionByIndex);
  server.get("/test/downVoteQuestionByIndex/:index", downVoteQuestionByIndex);
  server.get("/test/upVoteQuestionByAddress/:address", upVoteQuestionByAddress);

  server.get("*", function (req, res) {
    console.log("DEBUG :: ERROR => Received an unclaimed request");
    return handle(req, res);
  });

  server.use(function (err, req, res, next) {
    console.log("ERROR");
    return handle(err);
  });

  server.listen(5000, function (err) {
    if (err) throw err;

    console.log("Ready on http://localhost:5000");
  });
});
