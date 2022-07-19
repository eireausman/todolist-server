var express = require("express");
var router = express.Router();
const toDoItem = require("../controllers/toDoController");
const { verifyToken } = require("../modules/jwtToken");

// create a default GET route
router.get("/", verifyToken, toDoItem.toDoList);

router.post("/new-todo-item", toDoItem.addNewToDoItem);

// router.get("/any", toDoItem.findAnyToDo);

module.exports = router;
