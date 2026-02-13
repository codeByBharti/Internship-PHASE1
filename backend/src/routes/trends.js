const express = require("express");
const router = express.Router();
const { getTrends } = require("../controllers/trendController");

router.get("/trends", getTrends);

module.exports = router;
