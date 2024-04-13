const express = require("express")
const router = express.Router()

// Controller
const {
    insertProjectBackend,
    getAllProjectsBackend,
    getProjectBackendById,
    updateProjectBackend,
    deleteProjectBackend,
} = require("../controllers/ProjectBackendController")

// Routes
router.post("/", insertProjectBackend)
router.get("/", getAllProjectsBackend)
router.get("/:id", getProjectBackendById)
router.put("/:id", updateProjectBackend)
router.delete("/:id", deleteProjectBackend)

module.exports = router