export default function HotspotList({
  className = "card hotspot",
  hotspots
}) {
  if (!hotspots || hotspots.length === 0) {
    return (
      <div className={className}>
        <h2>Accident Hotspots</h2>
        <p>No hotspot data available</p>
      </div>
    );
  }

  return (
    <div className={className}>
      <h2>Accident Hotspots</h2>

      {hotspots.map((h, i) => (
        <p key={i}>
          Zone: <b>{h._id}</b> — Accidents: {h.totalAccidents}
        </p>
      ))}
    </div>
  );
}
