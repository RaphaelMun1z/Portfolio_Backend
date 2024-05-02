const express = require("express")
const router = express.Router()

// Middlewares
const verifyToken = require("../helpers/verify-token")

// Controller
const {
    insertReport,
    getAllReports,
    getReportById,
    deleteReport
} = require("../controllers/ReportController")

// Routes
router.post("/", verifyToken, insertReport)
router.get("/", verifyToken, getAllReports)
router.get("/:id", verifyToken, getReportById)
router.delete("/:id", verifyToken, deleteReport)

module.exports = router