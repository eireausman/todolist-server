var express = require("express");
var router = express.Router();
const createAccount = require("../controllers/createAccountController");
const User = require("../models/User");

router.post("/", createAccount.createUser);

module.exports = router;
