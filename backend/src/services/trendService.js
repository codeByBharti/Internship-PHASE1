const Accident = require("../models/Accident");

exports.getAccidentTrends = async (options = {}) => {
  try {
    const { startDate, endDate, zone } = options;

    const matchStage = {};

    // Optional Date Range Filter
    if (startDate || endDate) {
      matchStage.date = {};
      if (startDate) matchStage.date.$gte = new Date(startDate);
      if (endDate) matchStage.date.$lte = new Date(endDate);
    }

    // Optional Zone Filter
    if (zone) {
      matchStage.zone = zone;
    }

    const pipeline = [];

    // Add filtering only if needed
    if (Object.keys(matchStage).length > 0) {
      pipeline.push({ $match: matchStage });
    }

    pipeline.push(
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" },
            day: { $dayOfMonth: "$date" }
          },
          totalAccidents: { $sum: 1 }
        }
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
          "_id.day": 1
        }
      }
    );

    const trends = await Accident.aggregate(pipeline);

    return trends;

  } catch (error) {
    console.error("Accident trend error:", error.message);
    throw new Error("Failed to fetch accident trends");
  }
};
