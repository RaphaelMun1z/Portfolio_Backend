const express = require("express")
const router = express.Router()

// Controller
const {
    insertDatabase,
    getAllDatabases,
    getDatabaseById,
    updateDatabase,
    deleteDatabase,
} = require("../controllers/DatabaseController")

// Routes
router.post("/", insertDatabase)
router.get("/", getAllDatabases)
router.get("/:id", getDatabaseById)
router.put("/:id", updateDatabase)
router.delete("/:id", deleteDatabase)

module.exports = router