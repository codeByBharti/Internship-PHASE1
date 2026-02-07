const express = require("express");
const router = express.Router();
const { getAmbulanceLoad } = require("../controllers/ambulanceController");

router.get("/load", getAmbulanceLoad);

module.exports = router;
