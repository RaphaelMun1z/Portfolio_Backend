const express = require("express")
const router = express.Router()

// Middlewares
const verifyToken = require("../helpers/verify-token")

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
router.post("/", verifyToken, insertProject)
router.get("/", getAllProjects)
router.get("/reduced", getAllReducedProjects)
router.get("/:id", getProjectById)
router.put("/:id", verifyToken, updateProject)
router.delete("/:id", verifyToken, deleteProject)

module.exports = router