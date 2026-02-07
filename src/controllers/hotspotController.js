const Accident = require("../models/accident");

exports.getAccidentHotspots = async (req, res) => {
  try {
    const hotspots = await Accident.aggregate([
      {
        $group: {
          _id: "$zone",
          accidentCount: { $sum: 1 }
        }
      },
      { $sort: { accidentCount: -1 } }
    ]);

    res.json(hotspots);
  } catch (error) {
    res.status(500).json({ error: "Failed to detect hotspots" });
  }
};
