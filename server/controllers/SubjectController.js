// controllers/SubjectController.js
const Subject = require("../models/Subject");

// Add a new subject
const addSubject = async (req, res) => {
  try {
    const subjectInfo = req.body;
    const newSubject = await Subject.create(subjectInfo);
    res
      .status(201)
      .json({
        success: true,
        message: "Subject added successfully",
        data: newSubject,
      });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get all subjects
const getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.status(200).json({ success: true, data: subjects });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get subject by ID
const getSubjectById = async (req, res) => {
  try {
    const subjectId = req.params.subjectId;
    const subject = await Subject.findById(subjectId);
    if (!subject) {
      res.status(404).json({ success: false, message: "Subject not found" });
      return;
    }
    res.status(200).json({ success: true, data: subject });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update subject by ID
const updateSubject = async (req, res) => {
  try {
    const subjectId = req.params.subjectId;
    const updatedSubject = await Subject.findByIdAndUpdate(
      subjectId,
      req.body,
      { new: true }
    );
    if (!updatedSubject) {
      res.status(404).json({ success: false, message: "Subject not found" });
      return;
    }
    res
      .status(200)
      .json({
        success: true,
        message: "Subject updated successfully",
        data: updatedSubject,
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete subject by ID
const deleteSubject = async (req, res) => {
  try {
    const subjectId = req.params.subjectId;
    const deletedSubject = await Subject.findByIdAndDelete(subjectId);
    if (!deletedSubject) {
      res.status(404).json({ success: false, message: "Subject not found" });
      return;
    }
    res
      .status(200)
      .json({ success: true, message: "Subject deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  addSubject,
  getAllSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject,
};
