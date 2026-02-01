const express = require("express");
const { addIncome } = require("../controllers/incomeController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, addIncome);

module.exports = router;
