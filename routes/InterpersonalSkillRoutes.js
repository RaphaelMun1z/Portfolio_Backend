const express = require("express")
const router = express.Router()

// Controller
const {
    insertInterpersonalSkill,
    getAllInterpersonalSkills,
    getInterpersonalSkillById,
    updateInterpersonalSkill,
    deleteInterpersonalSkill,
} = require("../controllers/InterpersonalSkillController")

// Routes
router.post("/", insertInterpersonalSkill)
router.get("/", getAllInterpersonalSkills)
router.get("/:id", getInterpersonalSkillById)
router.put("/:id", updateInterpersonalSkill)
router.delete("/:id", deleteInterpersonalSkill)

module.exports = router