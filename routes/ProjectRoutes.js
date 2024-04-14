const express = require("express")
const router = express.Router()

// Controller
const {
    insertProject,
    getAllProjects,
    getAllReducedProjects,
    getProjectById,
    updateProject,
    deleteProject,
} = require("../controllers/ProjectController")

// Routes
router.post("/", insertProject)
router.get("/", getAllProjects)
router.get("/reduced", getAllReducedProjects)
router.get("/:id", getProjectById)
router.put("/:id", updateProject)
router.delete("/:id", deleteProject)

module.exports = router