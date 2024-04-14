const express = require("express")
const router = express.Router()

// Middlewares
const verifyToken = require("../helpers/verify-token")

// Controller
const {
    insertDatabase,
    getAllDatabases,
    getDatabaseById,
    updateDatabase,
    deleteDatabase,
} = require("../controllers/DatabaseController")

// Routes
router.post("/", verifyToken, insertDatabase)
router.get("/", getAllDatabases)
router.get("/:id", getDatabaseById)
router.put("/:id", verifyToken, updateDatabase)
router.delete("/:id", verifyToken, deleteDatabase)

module.exports = router