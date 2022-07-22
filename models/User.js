var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: { type: String, required: true, minLength: 3, unique: true },
  password: { type: String, required: true, minLength: 8 },
});

module.exports = mongoose.model("user", userSchema);
