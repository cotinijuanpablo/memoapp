const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const note = new Schema(
  { 
    title: String,
    category: String,
    deadline: Date,
    descriptionId: { type: Schema.Types.ObjectId, ref: 'NoteDetails' },
    done: {type: Boolean, default: false}
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", note);