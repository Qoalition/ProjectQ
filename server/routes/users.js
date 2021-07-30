const express = require('express')
const router = express.Router();
const db = require('../db/users')

router.get("/get", db.getUsers);

router.post("/create/:walletId", db.createUser);

module.exports = router