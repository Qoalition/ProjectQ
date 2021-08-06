const express = require('express')
const router = express.Router();
const db = require('../db/answers')

router.post("/create", db.createAnswer);

router.post("/upvote", db.upvoteAnswer);

router.post("/downvote", db.downvoteAnswer);

module.exports = router