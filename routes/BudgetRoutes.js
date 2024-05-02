const express = require("express")
const router = express.Router()

// Middlewares
const verifyToken = require("../helpers/verify-token")

// Controller
const {
    insertBudget,
    getAllBudgets,
    getBudgetById,
    deleteBudget
} = require("../controllers/BudgetController")

// Routes
router.post("/", verifyToken, insertBudget)
router.get("/", verifyToken, getAllBudgets)
router.get("/:id", verifyToken, getBudgetById)
router.delete("/:id", verifyToken, deleteBudget)

module.exports = router