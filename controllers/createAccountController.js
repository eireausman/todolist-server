const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// check if credentials are valid
exports.createUser = function (req, res, next) {
  bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
    if (err) {
      return next(err);
    }
    const user = new User({
      username: req.body.username,
      password: hashedPassword,
    }).save((err) => {
      if (err) {
        return next(err);
      }
      res.send("All done.  It has been saved");
    });
  });
};
