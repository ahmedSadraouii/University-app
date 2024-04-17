// routes/students.js
const express = require("express");
const router = express.Router();
const StudentController = require("../controllers/StudentController");

// Register a new student
router.post("/addStudent", StudentController.registerStudent);

// Get all students
router.get("/students", StudentController.getAllStudents);

// Get student by ID
router.get("/student/:id", StudentController.getStudentById);

// Update student by ID
router.put("/student/:id", StudentController.updateStudentById);

// Delete student by ID
router.delete("/student/:id", StudentController.deleteStudentById);

module.exports = router;
