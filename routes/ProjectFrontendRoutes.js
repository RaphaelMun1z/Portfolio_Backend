const express = require("express")
const router = express.Router()

// Controller
const {
    insertProjectFrontend,
    getAllProjectsFrontend,
    getProjectFrontendById,
    updateProjectFrontend,
    deleteProjectFrontend,
} = require("../controllers/ProjectFrontendController")

// Routes
router.post("/", insertProjectFrontend)
router.get("/", getAllProjectsFrontend)
router.get("/:id", getProjectFrontendById)
router.put("/:id", updateProjectFrontend)
router.delete("/:id", deleteProjectFrontend)

module.exports = router