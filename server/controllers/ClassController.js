// controllers/ClassController.js
const Class = require("../models/Class");

// Create a new class
const addClass = async (req, res) => {
  try {
    const classInfo = req.body;

    // Check if a class with the same sector and group already exists
    const existingClass = await Class.findOne({
      sector: classInfo.sector,
      group: classInfo.group,
    });

    if (existingClass) {
      // If a class with the same sector and group already exists
      return res.status(400).json({
        success: false,
        message: "Class with the same sector and group already exists",
      });
    }

    // If no existing class found, create the new class
    const newClass = await Class.create(classInfo);
    res
      .status(201)
      .json({ success: true, message: "Class created successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get all classes
const getAllClasses = async (req, res) => {
  try {
    const classes = await Class.find();
    res.status(200).json({
      success: true,
      message: "Classes retrieved successfully",
      data: classes.length === 0 ? "No classes found" : classes,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get class by ID
const getClassById = async (req, res) => {
  try {
    const classId = req.params.classId;
    const foundClass = await Class.findById(classId);
    if (!foundClass) {
      res.status(404).json({ success: false, message: "Class not found" });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Class retrieved successfully",
      data: foundClass,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update class by ID
const updateClass = async (req, res) => {
  try {
    const classId = req.params.classId;
    const updatedClass = await Class.findByIdAndUpdate(classId, req.body, {
      new: true,
    });
    if (!updatedClass) {
      res.status(404).json({ success: false, message: "Class not found" });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Class updated successfully",
      data: updatedClass,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete class by ID
const deleteClass = async (req, res) => {
  try {
    const classId = req.params.classId;
    const deletedClass = await Class.findByIdAndDelete(classId);
    if (!deletedClass) {
      res.status(404).json({ success: false, message: "Class not found" });
      return;
    }
    res
      .status(200)
      .json({ success: true, message: "Class deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addClass,
  getAllClasses,
  getClassById,
  updateClass,
  deleteClass,
};
