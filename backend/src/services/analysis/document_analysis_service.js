const documentProcessingService = require("../documents/document_processing_services");
const { extractRequirements } = require("../ai/requirement_extraction_service");
const supabase = require("../../config/supabase");

const analyzeDocument = async (userId, documentId) => {
  // 1. Extract text from the PDF
  const { document, extractedText } =
    await documentProcessingService.processDocument(
      userId,
      documentId
    );

  if (!extractedText || !extractedText.trim()) {
    throw new Error("No text could be extracted from the document");
  }

  // 2. Send extracted text to AI
  const requirements = await extractRequirements(extractedText);

  // 3. Save requirements in Supabase
  const { data, error } = await supabase
    .from("requirements")
    .insert({
      project_id: document.project_id,
      document_id: document.id,
      user_id: userId,
      product: requirements.product,
      category: requirements.category,
      description: requirements.description,
      structured_data: requirements
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

module.exports = {
  analyzeDocument
};