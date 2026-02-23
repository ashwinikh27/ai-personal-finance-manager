const express = require("express");
const { getFinancialInsights } = require("../controllers/aiController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/insights", protect, getFinancialInsights);

module.exports = router;