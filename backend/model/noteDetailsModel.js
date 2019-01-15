const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noteDetails = new Schema(
    {
        id: Number,
        message: String
    },
    { timestamps: true }
);

module.exports = mongoose.model("NoteDetails", noteDetails);