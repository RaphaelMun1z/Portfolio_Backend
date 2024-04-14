const express = require("express")
const router = express.Router()

// Middlewares
const verifyToken = require("../helpers/verify-token")

// Controller
const {
    insertProjectDatabase,
    getAllProjectsDatabase,
    getProjectDatabaseById,
    getProjectDatabaseByDatabaseId,
    getProjectDatabaseByProjectId,
    deleteProjectDatabase,
} = require("../controllers/ProjectDatabaseController")

// Routes
router.post("/", verifyToken, insertProjectDatabase)
router.get("/", getAllProjectsDatabase)
router.get("/:id", getProjectDatabaseById)
router.get("/database/:databaseId", getProjectDatabaseByDatabaseId)
router.get("/project/:projectId", getProjectDatabaseByProjectId)
router.delete("/:id", verifyToken, deleteProjectDatabase)

module.exports = router