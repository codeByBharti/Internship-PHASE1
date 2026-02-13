const Hospital = require("../models/Hospital");
const AmbulanceLog = require("../models/AmbulanceLog");
const Accident = require("../models/Accident");
const { calculateSeverity } = require("../utils/severityScore");

exports.generateAlerts = async () => {
  try {
    const hospitals = await Hospital.find();

    if (!hospitals.length) {
      return [];
    }

    // Pre-fetch counts (optimization)
    const ambulanceCounts = await AmbulanceLog.aggregate([
      {
        $group: {
          _id: "$hospital",
          count: { $sum: 1 }
        }
      }
    ]);

    const accidentCounts = await Accident.aggregate([
      {
        $group: {
          _id: "$zone",
          count: { $sum: 1 }
        }
      }
    ]);

    const ambulanceMap = {};
    ambulanceCounts.forEach(a => {
      ambulanceMap[a._id] = a.count;
    });

    const accidentMap = {};
    accidentCounts.forEach(a => {
      accidentMap[a._id] = a.count;
    });

    const alerts = [];

    for (let hospital of hospitals) {

      const ambulanceCount = ambulanceMap[hospital.name] || 0;
      const accidentCount = accidentMap[hospital.zone] || 0;

      const totalBeds = hospital.totalBeds || 0;
      const emergencyBeds = hospital.emergencyBeds || 0;

      // Safe pressure calculation
      const occupiedBeds = totalBeds - emergencyBeds;

      const pressure =
        totalBeds > 0
          ? (occupiedBeds / totalBeds) * 100
          : 0;

      const severity = calculateSeverity(
        pressure,
        ambulanceCount,
        accidentCount
      );

      let status = "NORMAL";

      if (severity > 80) status = "CRITICAL";
      else if (severity > 60) status = "HIGH";
      else if (severity > 40) status = "MODERATE";

      if (severity > 40) {
        alerts.push({
          hospital: hospital.name,
          pressure: Number(pressure.toFixed(2)),
          ambulanceCount,
          accidentCount,
          severity,
          status
        });
      }
    }

    return alerts;

  } catch (error) {
    console.error("Alert generation error:", error.message);
    throw new Error("Failed to generate alerts");
  }
};
