// controllers/TeacherController.js
const { Teacher } = require("../models/Users");

const bcrypt = require("bcrypt");

const registerTeacher = async (req, res) => {
  try {
    const {
      name,
      lastName,
      birthDate,
      phoneNumber,
      email,
      password,
      subjects,
      classes,
      documents,
    } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new teacher with hashed password
    const newTeacher = await Teacher.create({
      name,
      lastName,
      birthDate,
      phoneNumber,
      email,
      password: hashedPassword,
      subjects,
      classes,
      documents,
    });

    res.status(201).json({
      success: true,
      message: "Teacher registered successfully",
      data: newTeacher,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get all teachers
const getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.status(200).json({ success: true, data: teachers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get teacher by ID
const getTeacherById = async (req, res) => {
  try {
    const teacherId = req.params.id;
    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      res.status(404).json({ success: false, message: "Teacher not found" });
      return;
    }
    res.status(200).json({ success: true, data: teacher });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update teacher by ID
const updateTeacherById = async (req, res) => {
  try {
    const teacherId = req.params.id;
    const updatedTeacher = await Teacher.findByIdAndUpdate(
      teacherId,
      req.body,
      { new: true }
    );
    if (!updatedTeacher) {
      res.status(404).json({ success: false, message: "Teacher not found" });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Teacher updated successfully",
      data: updatedTeacher,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete teacher by ID
const deleteTeacherById = async (req, res) => {
  try {
    const teacherId = req.params.id;
    const deletedTeacher = await Teacher.findByIdAndDelete(teacherId);
    if (!deletedTeacher) {
      res.status(404).json({ success: false, message: "Teacher not found" });
      return;
    }
    res
      .status(200)
      .json({ success: true, message: "Teacher deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  registerTeacher,
  getAllTeachers,
  getTeacherById,
  updateTeacherById,
  deleteTeacherById,
};
