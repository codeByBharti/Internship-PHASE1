const Accident = require("../models/Accident");

exports.getHotspots = async () => {
  const hotspots = await Accident.aggregate([
    {
      $geoNear: {
        near: { type: "Point", coordinates: [77.5946, 12.9716] },
        distanceField: "distance",
        spherical: true
      }
    },
    {
      $group: {
        _id: "$zone",
        accidentCount: { $sum: 1 }
      }
    },
    { $sort: { accidentCount: -1 } }
  ]);

  return hotspots;
};
