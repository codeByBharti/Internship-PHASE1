const express = require("express");
const router = express.Router();
const Accident = require("../models/Accident");

// ✅ Get all accidents
router.get("/", async (req, res) => {
  try {
    const accidents = await Accident.find();
    res.json(accidents);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch accidents" });
  }
});

// ✅ Add accident
router.post("/", async (req, res) => {
  try {
    const accident = new Accident(req.body);
    await accident.save();
    res.status(201).json(accident);
  } catch (err) {
    res.status(400).json({ error: "Failed to add accident" });
  }
});

module.exports = router;
