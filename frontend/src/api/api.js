import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 5000, // prevents hanging forever
});

// Global response error handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.message);

    return Promise.reject(
      error.response?.data || {
        success: false,
        message: "Server not reachable. Please try again.",
      }
    );
  }
);

export const fetchDashboard = async () => {
  const response = await API.get("/analytics/dashboard");
  return response.data;
};
