const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema({
  name: String,
  location: {
    type: { type: String, default: "Point" },
    coordinates: [Number]
  },
  totalBeds: Number,
  emergencyBeds: Number
});

hospitalSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Hospital", hospitalSchema);
