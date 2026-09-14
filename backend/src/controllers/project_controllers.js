const projectService = require("../services/projects/projects_service");

const createProject = async (req, res, next) => {
  try {
    const { name, description } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        error: {
          message: "Project name is required"
        }
      });
    }

    const project = await projectService.createProject(req.user.id, {
      name: name.trim(),
      description
    });

    res.status(201).json({
      success: true,
      data: project
    });
  } catch (error) {
    next(error);
  }
};

const getProjects = async (req, res, next) => {
  try {
    const projects = await projectService.getProjects(req.user.id);

    res.json({
      success: true,
      data: projects
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProject,
  getProjects
};