const Hospital = require("../models/Hospital");

exports.getHospitalPressure = async (req, res) => {
  try {
    const hospitals = await Hospital.find();

    const pressureData = hospitals.map((h) => {

      const emergencyBeds = Number(h.emergencyBeds) || 0;
      const currentLoad = Number(h.currentLoad) || 0;

      const pressure =
        emergencyBeds > 0
          ? (currentLoad / emergencyBeds) * 100
          : 0;

      return {
        hospital: h.name,
        emergencyBeds,
        currentLoad,
        pressure: pressure.toFixed(2) + "%",
        status:
          pressure > 80 ? "CRITICAL"
          : pressure > 60 ? "HIGH"
          : "NORMAL"
      };
    });

    res.json(pressureData);

  } catch (error) {
    console.error("Pressure Error:", error);
    res.status(500).json({ error: "Failed to calculate pressure" });
  }
};
