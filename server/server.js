"use strict";
var next = require('next');
const express = require('express')
const bodyParser = require('body-parser');
// var express = require('express-observer');
const { contract } = require('./config')

var dev = process.env.NODE_ENV !== 'production';
var app = next({ dev: dev });

app.prepare().then(function () {
  var server = express();

  server.use(express.json())

  // console.log("Contract: ", contract.contract._address)
  // console.log("process.env.CONTRACT_ADDRESS: ", process.env.CONTRACT_ADDRESS)

  // contract.contract._address = process.env.CONTRACT_ADDRESS
  // console.log("Contract: ", contract.contract._address)

  // // contract.contract.setProvider(process.env.CONTRACT_ADDRESS)
  // contract.contract.events.QuestionCreated({})
  //   .on('data', (event) => {
  //     //db.deleteAllWishes();
  //     console.log("DEBUG: question created ", event)
  //   })
  //   .on('error', (event) => console.log('Error with event listener', event));

  server.use('/users', require("./routes/users"));
  server.use('/questions', require("./routes/questions"));
  server.use('/answers', require("./routes/answers"));
  // answers 
  // user login/authentication

  server.get('*', function (req, res) {
    console.log('DEBUG :: ERROR => Recieved an unclaimed request');
    return //handle(req, res);
  });

  server.use(function (err, req, res, next) {
    console.log("ERROR :", err);
    return //handle(err)
  });

  server.listen(5000, function (err) {
    if (err)
      throw err;
    console.log('Ready on http://localhost:5000');
  });
});