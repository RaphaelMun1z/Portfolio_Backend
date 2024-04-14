const express = require("express")
const router = express.Router()

// Controller
const {
    insertFormSubject,
    getAllFormSubjects,
    getFormSubjectById,
    updateFormSubject,
    deleteFormSubject,
} = require("../controllers/FormSubjectController")

// Routes
router.post("/", insertFormSubject)
router.get("/", getAllFormSubjects)
router.get("/:id", getFormSubjectById)
router.put("/:id", updateFormSubject)
router.delete("/:id", deleteFormSubject)

module.exports = router