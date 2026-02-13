const AmbulanceLog = require("../models/AmbulanceLog");
const { getAmbulanceLoadStatus } = require("../utils/thresholds");

exports.getAmbulanceLoadByHospital = async () => {
  const data = await AmbulanceLog.aggregate([
    {
      $group: {
        _id: "$hospital",
        ambulanceArrivals: { $sum: 1 }
      }
    }
  ]);

  return data.map(d => ({
    hospital: d._id,
    ambulanceArrivals: d.ambulanceArrivals,
    loadStatus: getAmbulanceLoadStatus(d.ambulanceArrivals)
  }));
};
