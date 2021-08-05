const express = require('express')
const router = express.Router();
const db = require('../db/answers')

router.post("/create", db.createAnswer);

module.exports = router