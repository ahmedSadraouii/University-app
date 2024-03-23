// routes/teachers.js
const express = require("express");
const router = express.Router();
const TeacherController = require("../controllers/TeacherController");

// Register a new teacher
router.post("/addTeacher", TeacherController.registerTeacher);

// Get all teachers
router.get("/teachers", TeacherController.getAllTeachers);

// Get teacher by ID
router.get("/teacher/:id", TeacherController.getTeacherById);

// Update teacher by ID
router.put("/teacher/:id", TeacherController.updateTeacherById);

// Delete teacher by ID
router.delete("/teacher/:id", TeacherController.deleteTeacherById);

module.exports = router;
