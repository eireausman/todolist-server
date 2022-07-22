var express = require("express");
var router = express.Router();
const loginController = require("../controllers/loginController");
const { verifyToken } = require("../modules/jwtToken");

router.post("/", loginController.logUserIn);

router.get("/success", loginController.loginSuccess);

router.get("/userauthenticationfailed", loginController.loginFailure);

module.exports = router;
