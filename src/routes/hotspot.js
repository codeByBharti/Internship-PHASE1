const express = require("express");
const router = express.Router();
const { getAccidentHotspots } = require("../controllers/hotspotController");

router.get("/hotspots", getAccidentHotspots);

module.exports = router;
