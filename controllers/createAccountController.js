const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// check if credentials are valid
exports.createUser = function (req, res, next) {
  bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
    if (err) {
      return next(err);
    }
    User.findOne({ username: req.body.username }).exec(function (
      err,
      existing_user
    ) {
      if (err) {
        return next(err);
      }
      if (existing_user === null) {
        const user = new User({
          username: req.body.username,
          password: hashedPassword,
        }).save((err) => {
          if (err) {
            return next(err);
          }
          res.send({
            requestOutcome: true,
            message: "Your account has been created.  Please login",
          });
        });
      } else {
        res.send({ requestOutcome: false, message: "User already exists" });
      }
    });
  });
};
