const AmbulanceLog = require("../models/AmbulanceLog");

exports.getAmbulanceLoad = async (req, res) => {
  try {
    const logs = await AmbulanceLog.aggregate([
      {
        $group: {
          _id: "$hospital",
          ambulanceArrivals: { $sum: 1 }
        }
      }
    ]);

    const result = logs.map(l => ({
      hospital: l._id,
      ambulanceArrivals: l.ambulanceArrivals,
      loadStatus:
        l.ambulanceArrivals > 15 ? "HEAVY" :
        l.ambulanceArrivals > 8 ? "MODERATE" : "LIGHT"
    }));

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to calculate ambulance load" });
  }
};
