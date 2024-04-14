const express = require("express")
const router = express.Router()

// Middlewares
const verifyToken = require("../helpers/verify-token")

// Controller
const {
    insertProjectTool,
    getAllProjectTools,
    getProjectToolById,
    getProjectToolByToolId,
    getProjectToolByProjectId,
    deleteProjectTool,
} = require("../controllers/ProjectToolController")

// Routes
router.post("/", verifyToken, insertProjectTool)
router.get("/", getAllProjectTools)
router.get("/:id", getProjectToolById)
router.get("/tool/:toolId", getProjectToolByToolId)
router.get("/project/:projectId", getProjectToolByProjectId)
router.delete("/:id", verifyToken, deleteProjectTool)

module.exports = router