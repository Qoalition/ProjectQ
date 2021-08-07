"use strict";
var next = require("next");
const express = require("express");
var dev = process.env.NODE_ENV !== "production";
var app = next({ dev: dev });
const usersRouter = require("./routes/users");
const questionsRouter = require("./routes/questions");
const answersRouter = require("./routes/answers");
// const rootContractRouter = require("./routes/rootContractRouter");
// const questionContractRouter = require("./routes/questionContractRouter");
// const answerContractRouter = require("./routes/answerContractRouter");

app.prepare().then(function () {
  var server = express();

  server.use(express.json());

  server.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    // res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

  server.use("/users", usersRouter);
  server.use("/questions", questionsRouter);
  server.use("/answers", answersRouter);

  // Keep for testing
  // server.use("/rootContract", rootContractRouter);
  // server.use("/questionContract", questionContractRouter);
  // server.use("/answerContract", answerContractRouter);

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
