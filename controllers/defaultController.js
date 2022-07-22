var ToDoItem = require("../models/toDo");
const { body, validationResult } = require("express-validator");
var async = require("async");
const toDo = require("../models/toDo");
const jwt = require("jsonwebtoken");

// check if the user is already logged
exports.checktokenvalidity = function (req, res, next) {
  res.send({ userLoggedIn: res.locals.userLoginStatus });
};
