var express = require("express");
var router = express.Router();
const defaultController = require("../controllers/defaultController");

router.get("/checktokenvalidity", defaultController.checktokenvalidity);

module.exports = router;
