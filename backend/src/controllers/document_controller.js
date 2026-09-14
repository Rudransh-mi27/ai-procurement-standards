const documentService = require("../services/documents/document_service");

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

module.exports = {
  uploadDocument
};