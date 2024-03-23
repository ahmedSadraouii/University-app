const express = require("express");
const router = express.Router();
const DocumentController = require("../controllers/DocumentController");
const Document = require("../models/Document");

router.post("/addDocument", DocumentController.addDocument);
router.get("/documents", DocumentController.getAllDocuments);
router.get("/document/:documentId", DocumentController.getDocumentById);
router.put("/document/:documentId", DocumentController.updateDocument);
router.delete("/document/:documentId", DocumentController.deleteDocument);

module.exports = router;
