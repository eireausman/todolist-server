var ToDoItem = require("../models/toDo");
const { body, validationResult } = require("express-validator");

var async = require("async");
const toDo = require("../models/toDo");

const jwt = require("jsonwebtoken");

// show all To Do Items
exports.toDoList = (req, res, next) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      ToDoItem.find({}, "title detail dueDate")
        .sort({ _id: -1 })
        .populate("detail")
        .exec(function (err, db_response) {
          if (err) {
            return next(err);
          }
          list_items = [];
          db_response.forEach((item) => {
            list_item = {
              _id: item._id,
              title: item.title,
              dueDate: item.dueDate,
              detail: item.detail,
              dueDate_formatted: item.dueDate_formatted,
            };
            list_items.push(list_item);
          });
          res.send({ list_items });
        });
    }
  });
};

// Create a new on POST.
exports.addNewToDoItem = [
  body("title", "Title must be at least three characters.")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body("detail", "None").trim().escape(),
  body("dueDate", "None").trim().escape(),
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a Book object with escaped and trimmed data.
    const newToDo = new toDo({
      title: req.body.title,
      detail: req.body.detail,
      dueDate: req.body.dueDate,
    });

    if (errors.isEmpty()) {
      // Data from form is valid. Save book.
      newToDo.save(function (err) {
        if (err) {
          return next(err);
        }
        //successful - redirect to new book record.
        res.send({
          Outcome: "Your note was saved.",
          ToDoDetail: newToDo,
        });
      });
    } else {
      res.send(errors.array());
    }
  },
];

// show any found To Do from DB:
exports.findAnyToDo = function (req, res, next) {
  ToDoItem.findOne({}).exec(function (err, list_toDos) {
    if (err) {
      return next(err);
    }
    //Successful, so render
    // res.send(body);
    console.log(list_toDos);
    res.send({ title: "toDoList", toDo_list: list_toDos });
  });
};
