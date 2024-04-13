const express = require("express")
const router = express.Router()

// Controller
const {
    insertProjectHost,
    getAllProjectsHost,
    getProjectHostById,
    updateProjectHost,
    deleteProjectHost,
} = require("../controllers/ProjectHostController")

// Routes
router.post("/", insertProjectHost)
router.get("/", getAllProjectsHost)
router.get("/:id", getProjectHostById)
router.put("/:id", updateProjectHost)
router.delete("/:id", deleteProjectHost)

module.exports = router