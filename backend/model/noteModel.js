const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noteModel = new Schema(
  { 
    category: String,
    deadline: Date,
    done: {type: Boolean, default: false}
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", noteModel);