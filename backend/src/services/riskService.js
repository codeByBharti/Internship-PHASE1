const Accident = require("../models/Accident");
const AmbulanceLog = require("../models/AmbulanceLog");
const Hospital = require("../models/Hospital");

exports.calculateRiskIndex = async () => {
  try {
    const accidentCount = await Accident.countDocuments();

    const activeAmbulances = await AmbulanceLog.countDocuments({
      status: "ACTIVE"
    });

    const hospitals = await Hospital.find();

    let totalLoad = 0;
    let totalBeds = 0;

    hospitals.forEach(h => {
      totalLoad += h.currentLoad || 0;
      totalBeds += h.emergencyBeds || 0;
    });

    const avgHospitalLoad =
      totalBeds > 0 ? ((totalLoad / totalBeds) * 100).toFixed(2) : 0;

    // Simple weighted risk formula
    const riskIndex = (
      accidentCount * 0.4 +
      activeAmbulances * 0.3 +
      avgHospitalLoad * 0.3
    ).toFixed(2);

    return {
      accidentCount,
      activeAmbulances,
      avgHospitalLoad,
      riskIndex
    };

  } catch (error) {
    console.error("Risk calculation error:", error.message);
    throw error;
  }
};
