const express = require("express")
const router = express.Router()

// Middlewares
const verifyToken = require("../helpers/verify-token")

// Controller
const {
    insertFormSubject,
    getAllFormSubjects,
    getFormSubjectById,
    getFormSubjectByFormType,
    updateFormSubject,
    deleteFormSubject,
} = require("../controllers/FormSubjectController")

// Routes
router.post("/", verifyToken, insertFormSubject)
router.get("/", getAllFormSubjects)
router.get("/form-type/:type", getFormSubjectByFormType)
router.get("/:id", getFormSubjectById)
router.put("/:id", verifyToken, updateFormSubject)
router.delete("/:id", verifyToken, deleteFormSubject)

module.exports = router