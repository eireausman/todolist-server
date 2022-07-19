const express = require("express");
const passport = require("passport");

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
  res.send(message);
};

exports.loginFailure = function (req, res, next) {
  const message = {
    LoginOutcome: false,
  };
  res.send(message);
};
