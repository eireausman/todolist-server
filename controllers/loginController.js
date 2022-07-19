const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

// check if credentials are valid
exports.logUserIn = function (req, res, next) {
  passport.authenticate("local", {
    failureRedirect: "/login/userauthenticationfailed",
    failureMessage: true,
    successRedirect: "/login/success",
  })(req, res, next);
};

exports.loginSuccess = function (req, res, next) {
  const message = {
    LoginOutcome: true,
    Username: req.user.username,
  };
  const user = {
    user: req.user.username,
  };
  jwt.sign(
    { user },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "120s" },
    (err, token) => {
      res.json({
        token,
      });
    }
  );
  // res.send(message);
};

exports.loginFailure = function (req, res, next) {
  const message = {
    LoginOutcome: false,
  };
  res.send(message);
};
