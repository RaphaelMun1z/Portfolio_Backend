const express = require("express")
const router = express.Router()

// Controller
const {
    insertProjectTool,
    getAllProjectTools,
    getProjectToolById,
    updateProjectTool,
    deleteProjectTool,
} = require("../controllers/ProjectToolController")

// Routes
router.post("/", insertProjectTool)
router.get("/", getAllProjectTools)
router.get("/:id", getProjectToolById)
router.put("/:id", updateProjectTool)
router.delete("/:id", deleteProjectTool)

module.exports = router