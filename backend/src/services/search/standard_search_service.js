const supabase = require("../../config/supabase");
const { generateEmbedding } = require("../ai/embedding_service");

const searchStandards = async (
  query,
  matchThreshold = 0.30,
  matchCount = 5
) => {
  if (!query || !query.trim()) {
    throw new Error("Search query is required");
  }

  const queryEmbedding = await generateEmbedding(query);

  const { data, error } = await supabase.rpc(
    "match_standard_chunks",
    {
      query_embedding: queryEmbedding,
      match_threshold: matchThreshold,
      match_count: matchCount
    }
  );

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

module.exports = {
  searchStandards
};