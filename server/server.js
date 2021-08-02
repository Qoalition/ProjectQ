"use strict";
var next = require('next');
// const express = require('express')
const bodyParser = require('body-parser');
var express = require('express-observer');

var dev = process.env.NODE_ENV !== 'production';
var app = next({ dev: dev });
var handle = app.getRequestHandler();

app.prepare().then(function () {
  var server = express();

  server.use(bodyParser.json())

  server.use('/users', require("./routes/users"));
  server.use('/questions/', require("./routes/questions"));

  server.get('*', function (req, res) {
    console.log('DEBUG :: ERROR => Recieved an unclaimed request');
    return handle(req, res);
  });

  server.use(function (err, req, res, next) {
    console.log("ERROR");
    return handle(err)
  });

  server.listen(5000, function (err) {
    if (err)
      throw err;
    console.log('Ready on http://localhost:5000');
  });
});
