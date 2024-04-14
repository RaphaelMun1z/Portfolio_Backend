const express = require("express")
const router = express.Router()

// Middlewares
const verifyToken = require("../helpers/verify-token")

// Controller
const {
    insertLanguage,
    getAllLanguages,
    getLanguageById,
    updateLanguage,
    deleteLanguage,
} = require("../controllers/LanguageController")

// Routes
router.post("/", verifyToken, insertLanguage)
router.get("/", getAllLanguages)
router.get("/:id", getLanguageById)
router.put("/:id", verifyToken, updateLanguage)
router.delete("/:id", verifyToken, deleteLanguage)

module.exports = router