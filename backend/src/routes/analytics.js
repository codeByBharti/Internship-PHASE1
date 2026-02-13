const express = require("express");
const router = express.Router();

const { fetchTrends } = require("../controllers/analyticsController");
const { getDashboardData } = require("../controllers/dashboardController");

// ===============================
// 📊 Trend Analysis
// ===============================
router.get("/trends", fetchTrends);

// ===============================
// 🚑 Unified Dashboard Analytics
// ===============================
router.get("/dashboard", getDashboardData);

module.exports = router;
