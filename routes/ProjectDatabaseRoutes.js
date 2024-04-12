const express = require("express")
const router = express.Router()

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
router.post("/", insertProjectDatabase)
router.get("/", getAllProjectsDatabase)
router.get("/:id", getProjectDatabaseById)
router.get("/database/:databaseId", getProjectDatabaseByDatabaseId)
router.get("/project/:projectId", getProjectDatabaseByProjectId)
router.delete("/:id", deleteProjectDatabase)

module.exports = router