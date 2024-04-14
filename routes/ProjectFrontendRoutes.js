const express = require("express")
const router = express.Router()

// Middlewares
const verifyToken = require("../helpers/verify-token")

// Controller
const {
    insertProjectFrontend,
    getAllProjectsFrontend,
    getProjectFrontendById,
    updateProjectFrontend,
    deleteProjectFrontend,
} = require("../controllers/ProjectFrontendController")

// Routes
router.post("/", verifyToken, insertProjectFrontend)
router.get("/", getAllProjectsFrontend)
router.get("/:id", getProjectFrontendById)
router.put("/:id", verifyToken, updateProjectFrontend)
router.delete("/:id", verifyToken, deleteProjectFrontend)

module.exports = router