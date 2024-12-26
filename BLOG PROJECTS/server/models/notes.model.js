const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema(
  {
    title: String,
    body: String,
    notesImage: {
      type: String,
      default:
       "https://www.wikihow.com/images/thumb/1/18/Take-Better-Notes-Step-1-Version-2.jpg/v4-460px-Take-Better-Notes-Step-1-Version-2.jpg.webp"
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const NotesModel = mongoose.model("notes", notesSchema);

module.exports = NotesModel;
