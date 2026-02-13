const mongoose = require("mongoose");

const ambulanceLogSchema = new mongoose.Schema({
  hospitalId: mongoose.Schema.Types.ObjectId,
  arrivalTime: Date,
  zone: String,
  patientSeverity: String
});

module.exports = mongoose.model("AmbulanceLog", ambulanceLogSchema);
