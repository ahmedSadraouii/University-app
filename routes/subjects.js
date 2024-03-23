// routes/subjects.js
const express = require("express");
const router = express.Router();
const SubjectController = require("../controllers/SubjectController");

router.post("/addSubject", SubjectController.addSubject);
router.get("/subjects", SubjectController.getAllSubjects);
router.get("/subject/:subjectId", SubjectController.getSubjectById);
router.put("/subject/:subjectId", SubjectController.updateSubject);
router.delete("/subject/:subjectId", SubjectController.deleteSubject);

module.exports = router;
