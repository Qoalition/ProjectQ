const express = require('express')
const router = express.Router();
const db = require('../db/questions')

router.get("/get", db.getAllQuestions);

router.post("/create", db.createQuestion);

router.get("/createcontract", /* create question contract */);

module.exports = router