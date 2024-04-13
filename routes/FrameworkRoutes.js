const express = require("express")
const router = express.Router()

// Controller
const {
    insertFramework,
    getAllFrameworks,
    getFrameworkById,
    updateFramework,
    deleteFramework,
} = require("../controllers/FrameworkController")

// Routes
router.post("/", insertFramework)
router.get("/", getAllFrameworks)
router.get("/:id", getFrameworkById)
router.put("/:id", updateFramework)
router.delete("/:id", deleteFramework)

module.exports = router