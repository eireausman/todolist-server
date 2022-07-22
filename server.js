require("dotenv").config();
require("./databaseConnector");
const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const express = require("express");
const path = require("path");
cors = require("cors");
const bcrypt = require("bcryptjs");

const User = require("./models/User");

const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const jwt = require("jsonwebtoken");
const todosRouter = require("./routes/todos");
const createAccountRouter = require("./routes/createAccount");
const loginRouter = require("./routes/login");
const defaultRouter = require("./routes/defaultRouter");

const app = express();
const port = process.env.PORT || 6000;

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          // passwords match! log user in
          return done(null, user);
        } else {
          // passwords do not match!
          return done(null, false, { message: "Incorrect password" });
        }
      });
    });
  })
);
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

app.use(
  session({
    secret: "another few words in this string",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(function (req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers["authorization"];
  // Check if bearer is undefined
  if (typeof bearerHeader !== "undefined") {
    // Split at the space
    const bearer = bearerHeader.split(" ");
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
  }
  next();
});

app.use(function (req, res, next) {
  jwt.verify(req.token, process.env.JWT_SECRET_KEY, (err, authData) => {
    if (err) {
      res.locals.userLoginStatus = false;
    } else {
      res.locals.loggedInUsername = authData.user.user;
      res.locals.userLoginStatus = true;
    }
  });
  next();
});

app.use("/todos", todosRouter);
app.use("/createaccount", createAccountRouter);
app.use("/login", loginRouter);
app.use("/", defaultRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send("Server Error : " + err);
});

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`));
