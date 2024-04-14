const express = require("express")
const router = express.Router()

// Middlewares
const verifyToken = require("../helpers/verify-token")

// Controller
const {
    insertTool,
    getAllTools,
    getToolById,
    updateTool,
    deleteTool,
} = require("../controllers/ToolController")

// Routes
router.post("/", verifyToken, insertTool)
router.get("/", getAllTools)
router.get("/:id", getToolById)
router.put("/:id", verifyToken, updateTool)
router.delete("/:id", verifyToken, deleteTool)

module.exports = router