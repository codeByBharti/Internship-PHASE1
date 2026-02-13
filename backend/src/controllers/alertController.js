const Hospital = require("../models/Hospital");
const Accident = require("../models/Accident");
const AmbulanceLog = require("../models/AmbulanceLog");
const { calculateSeverity } = require("../utils/severityScore");

exports.getAlerts = async (req, res) => {
  try {
    const hospitals = await Hospital.find();

    const alerts = await Promise.all(
      hospitals.map(async (hospital) => {

        // ✅ 1️⃣ Calculate Pressure
        const pressure =
          hospital.totalBeds > 0
            ? (hospital.currentLoad / hospital.totalBeds) * 100
            : 0;

        // ✅ 2️⃣ Count Accidents by Zone
        const accidentCount = await Accident.countDocuments({
          zone: hospital.zone
        });

        // ✅ 3️⃣ Count Ambulances by Hospital
        const ambulanceLoad = await AmbulanceLog.countDocuments({
          hospital: hospital.name
        });

        // ✅ 4️⃣ Calculate Severity Score
        const severityScore = calculateSeverity(
          pressure,
          ambulanceLoad,
          accidentCount
        );

        return {
          hospital: hospital.name,
          zone: hospital.zone,
          pressure: pressure.toFixed(2) + "%",
          accidentCount,
          ambulanceLoad,
          severityScore
        };
      })
    );

    res.json(alerts);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch alerts" });
  }
};
