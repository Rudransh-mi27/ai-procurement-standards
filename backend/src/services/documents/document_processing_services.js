const documentService = require("./document_service");
const { extractPdfText } = require("../../utils/pdf_util");

const processDocument = async (userId, documentId) => {
  // Get document information
  const document = await documentService.getDocumentById(
    userId,
    documentId
  );

  // Download PDF from Supabase Storage
  const pdf = await documentService.downloadDocument(
    document.storage_path
  );

  // Convert Blob to Buffer
  const buffer = Buffer.from(await pdf.arrayBuffer());

  // Extract text
  const extractedText = await extractPdfText(buffer);

  return {
    document,
    extractedText
  };
};

module.exports = {
  processDocument
};