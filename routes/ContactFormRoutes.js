const express = require("express")
const router = express.Router()

// Middlewares
const verifyToken = require("../helpers/verify-token")

// Controller
const {
    insertContactForm,
    getAllContactForms,
    getContactFormById,
    updateContactForm,
    deleteContactForm,
} = require("../controllers/ContactFormController")

// Routes
router.post("/", insertContactForm)
router.get("/", verifyToken, getAllContactForms)
router.get("/:id", verifyToken, getContactFormById)
router.put("/:id", verifyToken, updateContactForm)
router.delete("/:id", verifyToken, deleteContactForm)

module.exports = router