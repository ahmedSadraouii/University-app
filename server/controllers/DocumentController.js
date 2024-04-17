// controllers/DocumentController.js
const Document = require("../models/Document");

// Add a new document
const addDocument = async (req, res) => {
  try {
    const documentInfo = req.body;
    const newDocument = await Document.create(documentInfo);
    res
      .status(201)
      .json({
        success: true,
        message: "Document added successfully",
        data: newDocument,
      });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get all documents
const getAllDocuments = async (req, res) => {
  try {
    const documents = await Document.find();
    res.status(200).json({ success: true, data: documents });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get document by ID
const getDocumentById = async (req, res) => {
  try {
    const documentId = req.params.documentId;
    const document = await Document.findById(documentId);
    if (!document) {
      res.status(404).json({ success: false, message: "Document not found" });
      return;
    }
    res.status(200).json({ success: true, data: document });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update document by ID
const updateDocument = async (req, res) => {
  try {
    const documentId = req.params.documentId;
    const updatedDocument = await Document.findByIdAndUpdate(
      documentId,
      req.body,
      { new: true }
    );
    if (!updatedDocument) {
      res.status(404).json({ success: false, message: "Document not found" });
      return;
    }
    res
      .status(200)
      .json({
        success: true,
        message: "Document updated successfully",
        data: updatedDocument,
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete document by ID
const deleteDocument = async (req, res) => {
  try {
    const documentId = req.params.documentId;
    const deletedDocument = await Document.findByIdAndDelete(documentId);
    if (!deletedDocument) {
      res.status(404).json({ success: false, message: "Document not found" });
      return;
    }
    res
      .status(200)
      .json({ success: true, message: "Document deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  addDocument,
  getAllDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
};
