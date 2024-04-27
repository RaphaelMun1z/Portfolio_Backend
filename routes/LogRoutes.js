const express = require("express")
const router = express.Router()

// Middlewares
const verifyToken = require("../helpers/verify-token")

// Controller
const {
    insertLog,
    getAllLogs,
    getLogById,
} = require("../controllers/LogController")

// Routes
router.post("/", insertLog)
router.get("/", verifyToken, getAllLogs)
router.get("/:id", verifyToken, getLogById)

module.exports = router