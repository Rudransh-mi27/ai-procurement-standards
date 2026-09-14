const express = require("express");

const projectController = require("../controllers/project_controllers");
const requireAuth=require("../middleware/auth_middleware")

const router = express.Router();
router.use(requireAuth)

router.post("/",projectController.createProject);
router.get("/",projectController.getProjects);

module.exports = router;