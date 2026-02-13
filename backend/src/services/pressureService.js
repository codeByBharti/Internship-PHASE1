const Hospital = require("../models/Hospital");
const { getPressureStatus } = require("../utils/thresholds");

exports.calculateHospitalPressure = async () => {
  const hospitals = await Hospital.find();

  return hospitals.map(h => {
    const pressure =
      h.emergencyBeds > 0
        ? (h.currentLoad / h.emergencyBeds) * 100
        : 0;

    return {
      hospital: h.name,
      emergencyBeds: h.emergencyBeds,
      currentLoad: h.currentLoad,
      pressure: pressure.toFixed(2) + "%",
      status: getPressureStatus(pressure)
    };
  });
};
