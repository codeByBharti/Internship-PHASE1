export default function AmbulanceLoad({
  className = "card ambulance",
  risk
}) {
  if (!risk) {
    return (
      <div className={className}>
        <h2>Ambulance Load</h2>
        <p>No load data available</p>
      </div>
    );
  }

  return (
    <div className={className}>
      <h2>Ambulance Load</h2>

      <p>
        Active Ambulances: <b>{risk.activeAmbulances}</b>
      </p>

      <p>
        Accidents Today: <b>{risk.accidentCount}</b>
      </p>
    </div>
  );
}
