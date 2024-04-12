const express = require("express")
const router = express.Router()

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
router.post("/", insertProjectTool)
router.get("/", getAllProjectTools)
router.get("/:id", getProjectToolById)
router.get("/tool/:toolId", getProjectToolByToolId)
router.get("/project/:projectId", getProjectToolByProjectId)
router.delete("/:id", deleteProjectTool)

module.exports = router