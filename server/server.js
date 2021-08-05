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
const usersRouter = require("./routes/users");
const questionsRouter = require("./routes/questions");
const blockchainRouter = require("./routes/blockchain");

app.prepare().then(function () {
  var server = express();

  server.use(bodyParser.json());

  server.use("/users", usersRouter);
  server.use("/questions/", questionsRouter);
  server.use("/test", blockchainRouter);

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
