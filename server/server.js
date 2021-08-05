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

  server.use('/users', require("./routes/users"));
  server.use('/questions', require("./routes/questions"));
  server.use('/answers', require("./routes/answers"));

  server.get('*', function (req, res) {
    console.log('DEBUG :: Server Error => Recieved an unclaimed request');
    res.status(500).send("ERROR => Recieved an unclaimed request")
  });

  server.use(function (err, req, res, next) {
    console.log("DEBUG :: Server Error => :", err);
    res.status(500).send(err)
  });

  server.listen(5000, function (err) {
    if (err)
      throw err;
    console.log('Ready on http://localhost:5000');
  });
});