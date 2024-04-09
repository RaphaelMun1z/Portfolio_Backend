const express = require("express")
const router = express.Router()

// Controller
const {
    insertLanguage,
    getAllLanguages,
    getLanguageById,
    updateLanguage,
    deleteLanguage,
} = require("../controllers/LanguageController")

// Routes
router.post("/", insertLanguage)
router.get("/", getAllLanguages)
router.get("/:id", getLanguageById)
router.put("/:id", updateLanguage)
router.delete("/:id", deleteLanguage)

module.exports = router