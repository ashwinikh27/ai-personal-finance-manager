const express = require("express");
const { addExpense } = require("../controllers/expenseController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, addExpense);

module.exports = router;
