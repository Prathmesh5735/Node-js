const NotesModel = require("../models/notes.model");
const UserModel = require("../models/user.model");

const notesCreate = async (req, res) => {
  const { title, body } = req.body;

  if (!title || !body) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }
  try {
    console.log(req.user);
    await NotesModel.create({ title, body, userId: req.user._id });
    res.status(201).json({ message: "Note created successfully" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const notesDelete = async (req, res) => {
  const { notesId } = req.params;

  const isExistNotes = await NotesModel.findById(notesId);
  if (!isExistNotes) {
    return res.status(400).json({ message: "notes not exist" });
  }

  if (isExistNotes.userId != req.user._id) {
    return res
      .status(400)
      .json({ message: "you have not permission to delete notes" });
  }

  await NotesModel.findByIdAndDelete(notesId);
  res.status(200).json({ message: "notes deleted successfully" });
};

// get all user notes
const getsNotesByUser = async (req, res) => {
  const { userId } = req.params;

  if (userId != req.user._id) {
    return res
      .status(400)
      .json({ message: "you have not permission to get notes" });
  }

  try {
    const notes = await NotesModel.find({ userId }); //[]
    if (!notes.length > 0) {
      return res.status(400).json({ message: "notes not exist" });
    }

    res.status(200).json({ message: "notes gets successfully", notes });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

//get single User Notes by (User)

const getSingleUserNotes = async (req, res) => {
  const { notesId } = req.params;

  try {
    const isExistNotes = await NotesModel.findById(notesId);
    if (!isExistNotes) {
      return res.status(400).json({ message: "notes not exist" });
    }

    if (isExistNotes.userId != req.user._id) {
      return res
        .status(400)
        .json({ message: "you have not permission to get notes" });
    }

    res
      .status(200)
      .json({ message: "notes gets successfully", notes: isExistNotes });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const notesUpdate = async (req, res) => {
  const { notesId } = req.params;
  console.log(req.file)

  try {
    const isExistNotes = await NotesModel.findById(notesId);
    if (!isExistNotes) {
      return res.status(400).json({ message: "notes not exist" });
    }

    if (isExistNotes.userId != req.user._id) {
      return res
        .status(400)
        .json({ message: "you have not permission to delete notes" });
    }
    if (req.file) {
      await NotesModel.findByIdAndUpdate(notesId, {
        ...req.body,
        notesImage: req.file.filename,
      });
      res.status(200).json({ message: "notes updated successfully" });
    } else {
      await NotesModel.findByIdAndUpdate(notesId, req.body);
      res.status(200).json({ message: "notes updated successfully" });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

// admin

const GetAllNotesByAdmin = async (req, res) => {
  try {
    const totalNotes = await NotesModel.find();

    if (!totalNotes.length > 0) {
      return res.status(400).json({ message: "notes not exist" });
    }

    res.status(200).json({ message: "notes gets successfully", totalNotes });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const DeleteAllNotesByAdmin = async (req, res) => {
  try {

    await NotesModel.deleteMany({});

    res.status(200).json({ message: "notes deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

module.exports = {
  notesCreate,
  notesDelete,
  getsNotesByUser,
  getSingleUserNotes,
  notesUpdate,
  GetAllNotesByAdmin,
  DeleteAllNotesByAdmin,
};
