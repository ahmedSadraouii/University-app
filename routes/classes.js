const express = require("express");
const router = express.Router();
const ClassController = require("../controllers/ClassController");

router.post("/addClass", ClassController.addClass);
router.get("/classes", ClassController.getAllClasses);
router.get("/class/:classId", ClassController.getClassById);
router.put("/class/:classId", ClassController.updateClass);
router.delete("/class/:classId", ClassController.deleteClass);

module.exports = router;
