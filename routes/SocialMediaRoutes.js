const express = require("express")
const router = express.Router()

// Middlewares
const verifyToken = require("../helpers/verify-token")

// Controller
const {
    insertSocialMedia,
    getSocialMedia,
    updateSocialMedia,
} = require("../controllers/SocialMediaController")

// Routes
router.post("/", verifyToken, insertSocialMedia)
router.get("/", getSocialMedia)
router.put("/", verifyToken, updateSocialMedia)

module.exports = router