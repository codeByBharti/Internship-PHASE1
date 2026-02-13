import { useEffect, useState } from "react";
import PressureCard from "../components/PressureCard";
import HotspotList from "../components/HotspotList";
import AmbulanceLoad from "../components/AmbulanceLoad";
import { fetchDashboard } from "../api/api";
import "../styles/dashboard.css";

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadDashboard = async () => {
    try {
      const response = await fetchDashboard();

      // response already contains { success, data }
      if (response.success) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.error("Dashboard fetch failed:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();

    // Auto-refresh every 10 seconds
    const interval = setInterval(loadDashboard, 10000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <div className="dashboard">Loading Dashboard...</div>;
  }

  if (!dashboardData) {
    return <div className="dashboard">No data available</div>;
  }

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">
        AI Emergency <span>Command Center</span>
      </h1>

      <p className="subtitle">
        Real-time hospital pressure & emergency analytics monitoring
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
