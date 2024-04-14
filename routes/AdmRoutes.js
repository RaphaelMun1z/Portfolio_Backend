const express = require("express")
const router = express.Router()

// Middlewares
const verifyToken = require("../helpers/verify-token")

// Controller
const {
    insertAdm,
    loginAdm,
    checkAdm,
    getAdm,
    updateAdm
} = require("../controllers/AdmController")

// Routes
router.post("/register", insertAdm)
router.post("/login", loginAdm)
router.get("/checkAdm", checkAdm)
router.get("/", verifyToken, getAdm)
router.put("/:id", verifyToken, updateAdm)

module.exports = router