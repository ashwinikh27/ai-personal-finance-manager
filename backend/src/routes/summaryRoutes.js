const express = require("express");
const { getMonthlySummary } = require("../controllers/summaryController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/monthly", protect, getMonthlySummary);

module.exports = router;
