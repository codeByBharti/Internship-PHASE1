const express = require("express");
const router = express.Router();
const Hospital = require("../models/Hospital");

// ✅ Get all hospitals
router.get("/", async (req, res) => {
  try {
    const hospitals = await Hospital.find();
    res.json(hospitals);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch hospitals" });
  }
});

// ✅ Add hospital
router.post("/", async (req, res) => {
  try {
    const hospital = new Hospital(req.body);
    await hospital.save();
    res.status(201).json(hospital);
  } catch (err) {
    res.status(400).json({ error: "Failed to add hospital" });
  }
});

module.exports = router;
