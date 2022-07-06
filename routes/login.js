var express = require("express");
var router = express.Router();
const toDoItem = require("../controllers/toDoController");
const User = require("../models/User");

router.post("/", (req, res, next) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  }).save((err) => {
    if (err) {
      return next(err);
    }
    res.send("logged in");
  });
});

module.exports = router;
