const documentService = require("../services/documents/document_service");
const documentProcessingService = require("../services/documents/document_processing_services");
const {
  analyzeDocument
} = require("../services/analysis/document_analysis_service");

const uploadDocument = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: {
          message: "PDF file is required"
        }
      });
    }

    const { projectId } = req.body;

    if (!projectId) {
      return res.status(400).json({
        success: false,
        error: {
          message: "projectId is required"
        }
      });
    }

    const document = await documentService.uploadDocument(
      req.user.id,
      projectId,
      req.file
    );

    res.status(201).json({
      success: true,
      data: document
    });
  } catch (error) {
    next(error);
  }
};

const getDocument = async (req, res, next) => {
  try {
    const document = await documentService.getDocumentById(
      req.user.id,
      req.params.id
    );

    res.json({
      success: true,
      data: document
    });
  } catch (error) {
    next(error);
  }
};

const extractText = async (req, res, next) => {
  try {
    const result = await documentProcessingService.processDocument(
      req.user.id,
      req.params.id
    );

    res.json({
      success: true,
      data: {
        fileName: result.document.file_name,
        textLength: result.extractedText.length,
        text: result.extractedText
      }
    });
  } catch (error) {
    next(error);
  }
};

// temperory

const testDownload = async (req, res, next) => {
  try {
    const document = await documentService.getDocumentById(
      req.user.id,
      req.params.id
    );

    const pdf = await documentService.downloadDocument(
      document.storage_path
    );

    const buffer = Buffer.from(await pdf.arrayBuffer());

    res.json({
      success: true,
      fileName: document.file_name,
      size: buffer.length
    });
  } catch (error) {
    next(error);
  }
};

const analyze = async (req, res, next) => {
  try {
    const result = await analyzeDocument(
      req.user.id,
      req.params.id
    );

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};


module.exports = {
  uploadDocument,
  getDocument,
  testDownload,
  extractText,
  analyze
};