const projectService = require("../services/projects/projects_service");

const getProjects = async (req, res) => {
  try {
    const projects = await projectService.getProjects();

    res.json({
      success: true,
      message: "Projects fetched successfully",
      data: projects
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        message: error.message
      }
    });
  }
};

module.exports = {
  getProjects
};