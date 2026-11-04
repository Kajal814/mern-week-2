import Note from "../models/Note.js";

// Create Note
export const createNote = async (req, res) => {
  try {
    const { title, description } = req.body;

    // Check required fields
    if (!title || !description) {
      return res.status(400).json({
        message: "Title and description are required",
      });
    }

    // Create note
    const note = await Note.create({
      title,
      description,
      user: req.user.id,
    });

    res.status(201).json({
      message: "Note created successfully",
      note,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Get All Notes
export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      message: "Notes fetched successfully",
      count: notes.length,
      notes,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Single Note
export const getNote = async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    res.status(200).json({
      message: "Note fetched successfully",
      note,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Note
export const updateNote = async (req, res) => {
  try {
    const { title, description } = req.body;

    const note = await Note.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    // Update fields
    if (title !== undefined) {
      note.title = title;
    }

    if (description !== undefined) {
      note.description = description;
    }

    await note.save();

    res.status(200).json({
      message: "Note updated successfully",
      note,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Note
export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    await note.deleteOne();

    res.status(200).json({
      message: "Note deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};