import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // change if needed
});

export const fetchDashboard = async () => {
  const response = await API.get("/analytics/dashboard");
  return response.data;
};

