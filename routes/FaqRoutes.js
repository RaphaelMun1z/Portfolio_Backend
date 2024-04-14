const express = require("express")
const router = express.Router()

// Controller
const {
    insertFaq,
    getAllFaqs,
    getFaqById,
    updateFaq,
    deleteFaq,
} = require("../controllers/FaqController")

// Routes
router.post("/", insertFaq)
router.get("/", getAllFaqs)
router.get("/:id", getFaqById)
router.put("/:id", updateFaq)
router.delete("/:id", deleteFaq)

module.exports = router