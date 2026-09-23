const supabase = require("../../config/supabase");

const getRelatedStandards = async (standardId) => {
  const { data, error } = await supabase
    .from("standard_relationships")
    .select(`
      id,
      relationship_type,
      description,
      target_standard_id,
      standards:target_standard_id (
        id,
        standard_number,
        title,
        description,
        scope,
        category,
        status,
        source,
        source_url,
        is_demo
      )
    `)
    .eq("source_standard_id", standardId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

module.exports = {
  getRelatedStandards
};