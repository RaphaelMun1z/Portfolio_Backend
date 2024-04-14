const express = require("express")
const router = express.Router()

// Middlewares
const verifyToken = require("../helpers/verify-token")

// Controller
const {
    insertProjectHost,
    getAllProjectsHost,
    getProjectHostById,
    updateProjectHost,
    deleteProjectHost,
} = require("../controllers/ProjectHostController")

// Routes
router.post("/", verifyToken, insertProjectHost)
router.get("/", getAllProjectsHost)
router.get("/:id", getProjectHostById)
router.put("/:id", verifyToken, updateProjectHost)
router.delete("/:id", verifyToken, deleteProjectHost)

module.exports = router