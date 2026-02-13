export default function PressureCard({
  className = "card hospital",
  risk,
  alerts
}) {
  if (!alerts || alerts.length === 0) {
    return (
      <div className={className}>
        <h2>Hospital Pressure</h2>
        <p>No critical pressure detected</p>
      </div>
    );
  }

  return (
    <div className={className}>
      <h2>Hospital Pressure</h2>

      {alerts.map((h, i) => (
        <p key={i}>
          <b>{h.hospital}</b> — {h.pressure}% ({h.status})
        </p>
      ))}

      {risk && (
        <p style={{ marginTop: "10px", fontWeight: "bold" }}>
          City Risk Index: {risk.riskIndex}
        </p>
      )}
    </div>
  );
}
