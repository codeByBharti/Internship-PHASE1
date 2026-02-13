import { useEffect, useState } from "react";
import PressureCard from "../components/PressureCard";
import HotspotList from "../components/HotspotList";
import AmbulanceLoad from "../components/AmbulanceLoad";
import { fetchDashboard } from "../api/api";
import "../styles/dashboard.css";

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [connected, setConnected] = useState(false);

  const loadDashboard = async () => {
    try {
      setError(null);

      const response = await fetchDashboard();

      if (response.success) {
        setDashboardData(response.data);
        setConnected(true);
      } else {
        setError("Failed to load dashboard data.");
        setConnected(false);
      }
    } catch (err) {
      setError(err.message || "Unable to connect to server.");
      setConnected(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();

    const interval = setInterval(loadDashboard, 10000);
    return () => clearInterval(interval);
  }, []);

  // ===== Loading State =====
  if (loading) {
    return (
      <div className="dashboard">
        <h2>Loading dashboard data...</h2>
      </div>
    );
  }

  // ===== Error State =====
  if (error) {
    return (
      <div className="dashboard">
        <h2 style={{ color: "red" }}>{error}</h2>
      </div>
    );
  }

  // ===== No Data Fallback =====
  if (!dashboardData) {
    return (
      <div className="dashboard">
        <h2>No data available</h2>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">
        AI Emergency <span>Command Center</span>
      </h1>

      <p className="subtitle">
        Real-time hospital pressure & emergency analytics monitoring
      </p>

      {/* Backend Status */}
      <p style={{ color: connected ? "green" : "red", marginBottom: "20px" }}>
        {connected ? "Backend Connected" : "Backend Disconnected"}
      </p>

      <div className="cards">
        <PressureCard
          className="card hospital"
          risk={dashboardData.risk}
          alerts={dashboardData.alerts}
        />

        <HotspotList
          className="card hotspot"
          hotspots={dashboardData.hotspots}
        />

        <AmbulanceLoad
          className="card ambulance"
          risk={dashboardData.risk}
        />
      </div>
    </div>
  );
}
