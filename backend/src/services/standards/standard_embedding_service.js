const supabase = require("../../config/supabase");
const { generateEmbedding } = require("../ai/embedding_service");

const generateStandardEmbeddings = async () => {
  const { data: chunks, error } = await supabase
    .from("standard_chunks")
    .select("id, content")
    .is("embedding", null);

  if (error) {
    throw new Error(error.message);
  }

  if (!chunks || chunks.length === 0) {
    return {
      processed: 0,
      message: "No chunks need embeddings"
    };
  }

  let processed = 0;

  for (const chunk of chunks) {
    const embedding = await generateEmbedding(chunk.content);

    const { error: updateError } = await supabase
      .from("standard_chunks")
      .update({
        embedding
      })
      .eq("id", chunk.id);

    if (updateError) {
      throw new Error(updateError.message);
    }

    processed++;

    console.log(
      `Embedding generated: ${processed}/${chunks.length}`
    );
  }

  return {
    processed
  };
};

module.exports = {
  generateStandardEmbeddings
};