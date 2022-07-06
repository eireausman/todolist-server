const mongoose = require("mongoose");

var mongoDb = process.env.DB_CONNECTION_STRING;
mongoose.connect(mongoDb, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

mongoose.connection.on("connecting", () => {
  console.log("db connecting");
  // console.log(mongoose.connection.readyState); //logs 2
});
mongoose.connection.on("connected", () => {
  console.log("db connected");
  // console.log(mongoose.connection.readyState); //logs 1
});
mongoose.connection.on("disconnecting", () => {
  console.log("db disconnecting");
  // console.log(mongoose.connection.readyState); // logs 3
});
mongoose.connection.on("disconnected", () => {
  console.log("db disconnected");
  // console.log(mongoose.connection.readyState); //logs 0
});
