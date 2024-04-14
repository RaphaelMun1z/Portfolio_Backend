const express = require("express")
const router = express.Router()

// Middlewares
const verifyToken = require("../helpers/verify-token")

// Controller
const {
    insertFramework,
    getAllFrameworks,
    getFrameworkById,
    updateFramework,
    deleteFramework,
} = require("../controllers/FrameworkController")

// Routes
router.post("/", verifyToken, insertFramework)
router.get("/", getAllFrameworks)
router.get("/:id", getFrameworkById)
router.put("/:id", verifyToken, updateFramework)
router.delete("/:id", verifyToken, deleteFramework)

module.exports = router