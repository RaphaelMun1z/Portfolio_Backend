const express = require("express")
const router = express.Router()

// Controller
const {
    insertTool,
    getAllTools,
    getToolById,
    updateTool,
    deleteTool,
} = require("../controllers/ToolController")

// Routes
router.post("/", insertTool)
router.get("/", getAllTools)
router.get("/:id", getToolById)
router.put("/:id", updateTool)
router.delete("/:id", deleteTool)

module.exports = router