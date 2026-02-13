const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema({
  name: String,

  zone: String, // 🔥 ADD THIS

  location: {
    type: { type: String, default: "Point" },
    coordinates: [Number]
  },

  totalBeds: Number,
  emergencyBeds: Number,
  currentLoad: Number // 🔥 ADD THIS
});

hospitalSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Hospital", hospitalSchema);
