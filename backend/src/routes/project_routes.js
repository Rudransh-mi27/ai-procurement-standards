const express = require("express");

const projectController = require("../controllers/project_controllers");

const router = express.Router();

router.get("/", projectController.getProjects);

module.exports = router;