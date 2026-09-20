const crypto = require("crypto");
const supabase = require("../../config/supabase");

const uploadDocument = async (userId, projectId, file) => {
  const fileExtension = "pdf";

  const documentId = crypto.randomUUID();

  const storagePath = `${userId}/${projectId}/${documentId}.${fileExtension}`;

  const { error: uploadError } = await supabase.storage
    .from("tender-documents")
    .upload(storagePath, file.buffer, {
      contentType: file.mimetype,
      upsert: false
    });

  if (uploadError) {
    throw new Error(uploadError.message);
  }

  const { data, error: dbError } = await supabase
    .from("documents")
    .insert({
      id: documentId,
      project_id: projectId,
      user_id: userId,
      file_name: file.originalname,
      storage_path: storagePath,
      file_size: file.size,
      mime_type: file.mimetype,
      processing_status: "uploaded"
    })
    .select()
    .single();

  if (dbError) {
    // Remove uploaded file if database insertion fails
    await supabase.storage
      .from("tender-documents")
      .remove([storagePath]);

    throw new Error(dbError.message);
  }

  return data;
};

const getDocumentById = async (userId, documentId) => {
  const { data, error } = await supabase
    .from("documents")
    .select("*")
    .eq("id", documentId)
    .eq("user_id", userId)
    .single();

  if (error || !data) {
    throw new Error("Document not found");
  }

  return data;
};

const downloadDocument = async (storagePath) => {
  const { data, error } = await supabase.storage
    .from("tender-documents")
    .download(storagePath);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

module.exports = {
  uploadDocument,
  getDocumentById,
  downloadDocument
};