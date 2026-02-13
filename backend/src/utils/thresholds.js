exports.getPressureStatus = (pressure) => {
  if (pressure >= 80) return "CRITICAL";
  if (pressure >= 60) return "HIGH";
  return "NORMAL";
};

exports.getAmbulanceLoadStatus = (count) => {
  if (count >= 10) return "HEAVY";
  if (count >= 5) return "MODERATE";
  return "LIGHT";
};
