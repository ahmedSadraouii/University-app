// controllers/StudentController.js
const { Student } = require("../models/Users");

const bcrypt = require("bcrypt");

const registerStudent = async (req, res) => {
  try {
    const {
      name,
      lastName,
      birthDate,
      phoneNumber,
      email,
      password,
      class: studentClass,
    } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new student with hashed password
    const newStudent = await Student.create({
      name,
      lastName,
      birthDate,
      phoneNumber,
      email,
      password: hashedPassword,
      class: studentClass,
    });

    res.status(201).json({
      success: true,
      message: "Student registered successfully",
      data: newStudent,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get all students
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json({ success: true, data: students });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get student by ID
const getStudentById = async (req, res) => {
  try {
    const studentId = req.params.id;
    const student = await Student.findById(studentId);
    if (!student) {
      res.status(404).json({ success: false, message: "Student not found" });
      return;
    }
    res.status(200).json({ success: true, data: student });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update student by ID
const updateStudentById = async (req, res) => {
  try {
    const studentId = req.params.id;
    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      req.body,
      { new: true }
    );
    if (!updatedStudent) {
      res.status(404).json({ success: false, message: "Student not found" });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Student updated successfully",
      data: updatedStudent,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete student by ID
const deleteStudentById = async (req, res) => {
  try {
    const studentId = req.params.id;
    const deletedStudent = await Student.findByIdAndDelete(studentId);
    if (!deletedStudent) {
      res.status(404).json({ success: false, message: "Student not found" });
      return;
    }
    res
      .status(200)
      .json({ success: true, message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  registerStudent,
  getAllStudents,
  getStudentById,
  updateStudentById,
  deleteStudentById,
};
