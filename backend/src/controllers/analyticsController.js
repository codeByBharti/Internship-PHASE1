const { getAccidentTrends } = require("../services/trendService");

exports.fetchTrends = async (req, res) => {
  try {
    const { startDate, endDate, zone } = req.query;

    // Validate date format if provided
    if (startDate && isNaN(Date.parse(startDate))) {
      return res.status(400).json({
        success: false,
        message: "Invalid startDate format"
      });
    }

    if (endDate && isNaN(Date.parse(endDate))) {
      return res.status(400).json({
        success: false,
        message: "Invalid endDate format"
      });
    }

    const data = await getAccidentTrends({
      startDate,
      endDate,
      zone
    });

    return res.status(200).json({
      success: true,
      count: data.length,
      data
    });

  } catch (err) {
    console.error("Trend controller error:", err.message);

    return res.status(500).json({
      success: false,
      message: "Trend analysis failed"
    });
  }
};
