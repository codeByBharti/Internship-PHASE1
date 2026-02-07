const express = require("express");
const router = express.Router();
const { getHospitalPressure } = require("../controllers/pressureController");

router.get("/pressure", getHospitalPressure);

module.exports = router;
