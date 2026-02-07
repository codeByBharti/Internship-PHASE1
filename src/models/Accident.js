const mongoose = require("mongoose");

const accidentSchema = new mongoose.Schema({
  location: {
    type: { type: String, default: "Point" },
    coordinates: [Number]
  },
  date: Date,
  severity: String,
  weather: String,
  nearbyFestival: Boolean
});

accidentSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Accident", accidentSchema);
