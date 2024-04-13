const express = require("express")
const router = express.Router()

// Controller
const {
    insertProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject,
} = require("../controllers/ProjectController")

// Routes
router.post("/", insertProject)
router.get("/", getAllProjects)
router.get("/:id", getProjectById)
router.put("/:id", updateProject)
router.delete("/:id", deleteProject)

module.exports = router