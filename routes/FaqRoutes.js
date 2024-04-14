const express = require("express")
const router = express.Router()

// Middlewares
const verifyToken = require("../helpers/verify-token")

// Controller
const {
    insertFaq,
    getAllFaqs,
    getFaqById,
    updateFaq,
    deleteFaq,
} = require("../controllers/FaqController")

// Routes
router.post("/", verifyToken, insertFaq)
router.get("/", getAllFaqs)
router.get("/:id", getFaqById)
router.put("/:id", verifyToken, updateFaq)
router.delete("/:id", verifyToken, deleteFaq)

module.exports = router