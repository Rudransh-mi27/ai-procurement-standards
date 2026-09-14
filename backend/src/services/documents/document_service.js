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

module.exports = {
  uploadDocument
};