exports.calculateSeverity = (pressure, ambulanceLoad, accidentCount) => {
  let score = 0;

  if (pressure > 80) score += 40;
  else if (pressure > 60) score += 25;

  if (ambulanceLoad > 10) score += 30;
  else if (ambulanceLoad > 5) score += 15;

  if (accidentCount > 20) score += 30;
  else if (accidentCount > 10) score += 15;

  return score;
};
