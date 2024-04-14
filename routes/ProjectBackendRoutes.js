const express = require("express")
const router = express.Router()

// Middlewares
const verifyToken = require("../helpers/verify-token")

// Controller
const {
    insertProjectBackend,
    getAllProjectsBackend,
    getProjectBackendById,
    updateProjectBackend,
    deleteProjectBackend,
} = require("../controllers/ProjectBackendController")

// Routes
router.post("/", verifyToken, insertProjectBackend)
router.get("/", getAllProjectsBackend)
router.get("/:id", getProjectBackendById)
router.put("/:id", verifyToken, updateProjectBackend)
router.delete("/:id", verifyToken, deleteProjectBackend)

module.exports = router