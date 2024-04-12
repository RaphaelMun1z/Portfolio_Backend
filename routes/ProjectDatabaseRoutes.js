const express = require("express")
const router = express.Router()

// Controller
const {

} = require("../controllers/ProjectDatabaseController")

// Routes
router.post("/", insertProjectDatabase)
router.get("/", getAllProjectsDatabase)
router.get("/:id", getProjectDatabaseById)
router.put("/:id", updateProjectDatabase)
router.delete("/:id", deleteProjectDatabase)

module.exports = router