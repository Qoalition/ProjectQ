"use strict";
var next = require("next");
const express = require("express");
const bodyParser = require("body-parser");
// var express = require('express-observer');
const Web3 = require("web3");
var dev = process.env.NODE_ENV !== "production";
var app = next({ dev: dev });
const usersRouter = require("./routes/users");
const questionsRouter = require("./routes/questions");
const answersRouter = require("./routes/answers");
const rootContractRouter = require("./routes/rootContractRouter");
const questionContractRouter = require("./routes/questionContractRouter");

app.prepare().then(function () {
  var server = express();

  server.use(express.json());

  server.use("/users", usersRouter);
  server.use("/questions", questionsRouter);
  server.use("/answers", answersRouter);
  // Keep for testing
  server.use("/rootContract", rootContractRouter);
  server.use("/questionContract", questionContractRouter);

  server.get("*", function (req, res) {
    console.log("DEBUG :: Server Error => Recieved an unclaimed request");
    res.status(500).send("ERROR => Recieved an unclaimed request");
  });

  server.use(function (err, req, res, next) {
    console.log("DEBUG :: Server Error => :", err);
    res.status(500).send(err);
  });

  server.listen(5000, function (err) {
    if (err) throw err;
    console.log("Ready on http://localhost:5000");
  });
});
