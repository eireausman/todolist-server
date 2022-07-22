var express = require("express");
var router = express.Router();
const createAccount = require("../controllers/createAccountController");

router.post("/", createAccount.createUser);

module.exports = router;
