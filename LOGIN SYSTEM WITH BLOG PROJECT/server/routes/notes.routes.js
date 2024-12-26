const express = require("express");
const {
  notesCreate,
  notesDelete,
  getsNotesByUser,
  getSingleUserNotes,
  notesUpdate,
  GetAllNotesByAdmin,
  DeleteAllNotesByAdmin,
} = require("../controllers/notes.controllers");
const isAuth = require("../middleware/Auth");
const upload = require("../config/multer");
const isAdmin = require("../middleware/Admin");

const notesRouter = express.Router();

notesRouter.post("/create", isAuth, notesCreate);

notesRouter.delete("/delete/:notesId", isAuth, notesDelete);

// get all user notes
notesRouter.get("/get/:userId", isAuth, getsNotesByUser);

notesRouter.get("/singleNotes/:notesId", isAuth, getSingleUserNotes);

notesRouter.patch(
  "/update/:notesId",
  isAuth,
  upload.single("file"),
  notesUpdate
);

// admin Routes

// notesRouter.get("/getallnotes", isAuth, isAdmin, GetAllNotesByAdmin);
 notesRouter.get("/getallnotes",  GetAllNotesByAdmin);
notesRouter.delete("/deleteallnotes", isAuth, isAdmin, DeleteAllNotesByAdmin);
module.exports = notesRouter;
