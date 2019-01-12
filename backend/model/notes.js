const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DataSchema = new Schema(
  { id: Number,
    category: String,
    deadline: Date
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tasks", DataSchema);