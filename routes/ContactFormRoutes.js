const express = require("express")
const router = express.Router()

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
router.get("/", getAllContactForms)
router.get("/:id", getContactFormById)
router.put("/:id", updateContactForm)
router.delete("/:id", deleteContactForm)

module.exports = router