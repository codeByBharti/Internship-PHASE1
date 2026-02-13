const Accident = require("../models/Accident");

exports.getTrends = async (req, res) => {
  try {
    const trends = await Accident.aggregate([
      {
        $group: {
          _id: { $month: "$date" },
          accidentCount: { $sum: 1 }
        }
      },
      { $sort: { "_id": 1 } }
    ]);

    res.json(trends);

  } catch (error) {
  console.error("Trend Error:", error);
  res.status(500).json({ error: "Failed to fetch trends" });
}

};
