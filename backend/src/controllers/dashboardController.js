const { calculateRiskIndex } = require("../services/riskService");
const { generateAlerts } = require("../services/alertService");
const { getAccidentTrends } = require("../services/trendService");
const Accident = require("../models/Accident");

exports.getDashboardData = async (req, res) => {
  try {
    const risk = await calculateRiskIndex();
    const alerts = await generateAlerts();
    const trends = await getAccidentTrends();

    const hotspots = await Accident.aggregate([
      {
        $group: {
          _id: "$zone",
          totalAccidents: { $sum: 1 }
        }
      },
      { $sort: { totalAccidents: -1 } },
      { $limit: 5 }
    ]);

    return res.status(200).json({
      success: true,
      data: {
        risk,
        alerts,
        trends,
        hotspots
      }
    });

  } catch (error) {
    console.error("Dashboard error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Dashboard fetch failed"
    });
  }
};
