const express = require("express")
const router = express.Router()

// Middlewares
const verifyToken = require("../helpers/verify-token")

// Controller
const {
    insertInterpersonalSkill,
    getAllInterpersonalSkills,
    getInterpersonalSkillById,
    updateInterpersonalSkill,
    deleteInterpersonalSkill,
} = require("../controllers/InterpersonalSkillController")

// Routes
router.post("/", verifyToken, insertInterpersonalSkill)
router.get("/", getAllInterpersonalSkills)
router.get("/:id", getInterpersonalSkillById)
router.put("/:id", verifyToken, updateInterpersonalSkill)
router.delete("/:id", verifyToken, deleteInterpersonalSkill)

module.exports = router