const supabase = require("../../config/supabase");

const createProject = async (userId, projectData) => {
  const { data, error } = await supabase
    .from("projects")
    .insert({
      user_id: userId,
      name: projectData.name,
      description: projectData.description || null,
      status: "active",
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const getProjects = async (userId) => {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

module.exports = {
  createProject,
  getProjects,
};
