const express = require("express")
const router = express.Router()

// Middlewares
const verifyToken = require("../helpers/verify-token")
const { imageUpload } = require("../middlewares/imageUpload")

// Controller
const {
    insertProjectImage,
    getProjectImagesById,
    deleteProjectImage,
} = require("../controllers/ProjectImageController")

// Routes
router.post("/", verifyToken, imageUpload.single("image"), insertProjectImage)
router.get("/:id", getProjectImagesById)
router.delete("/:id", verifyToken, deleteProjectImage)

module.exports = router