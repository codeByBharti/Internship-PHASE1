const mongoose = require("mongoose");

const accidentSchema = new mongoose.Schema({
  zone: {
    type: String,
    required: true
  },
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

module.exports =
  mongoose.models.Accident ||
  mongoose.model("Accident", accidentSchema);
