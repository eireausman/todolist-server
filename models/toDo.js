var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const { DateTime } = require("luxon");

var toDoSchema = new Schema({
  title: { type: String, required: true, minLength: 3 },
  dueDate: { type: Date },
  detail: { type: String },
});

// Virtual URL
toDoSchema.virtual("url").get(function () {
  return "/todos/todo/" + this._id;
});

toDoSchema.virtual("dueDate_formatted").get(function () {
  return DateTime.fromJSDate(this.dueDate).toLocaleString(DateTime.DATE_MED);
});

//Export model
module.exports = mongoose.model("toDo", toDoSchema);
