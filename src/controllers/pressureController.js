const Hospital = require("../models/Hospital");

exports.getHospitalPressure = async (req, res) => {
  try {
    const hospitals = await Hospital.find();

    const pressureData = hospitals.map(h => {

      // Safety check
      if (!h.emergencyBeds || h.emergencyBeds === 0) {
        return {
          hospital: h.name,
          pressure: "0%",
          status: "NO DATA"
        };
      }

      // Simulated emergency load (Phase-1 MVP)
      const currentLoad = Math.floor(
        Math.random() * h.emergencyBeds
      );

      const pressure =
        (currentLoad / h.emergencyBeds) * 100;

      return {
        hospital: h.name,
        emergencyBeds: h.emergencyBeds,
        currentLoad,
        pressure: pressure.toFixed(2) + "%",
        status:
          pressure > 80 ? "CRITICAL" :
          pressure > 60 ? "HIGH" : "NORMAL"
      };
    });

    res.json(pressureData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to calculate pressure" });
  }
};
