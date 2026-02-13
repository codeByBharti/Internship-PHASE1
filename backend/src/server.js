require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");

const hospitalRoutes = require("./routes/hospitalRoutes");
const accidentRoutes = require("./routes/accidentRoutes");
const analyticsRoutes = require("./routes/analytics");

const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();

// ================= Routes =================
app.use("/api", require("./routes/pressure"));
app.use("/api", require("./routes/hotspot"));
app.use("/api/ambulances", require("./routes/ambulanceRoutes"));
app.use("/api", require("./routes/alerts"));
app.use("/api", require("./routes/trends"));

app.use("/api/hospitals", hospitalRoutes);
app.use("/api/accidents", accidentRoutes);

// Analytics Route
app.use("/api/analytics", analyticsRoutes);

// ================= Global Error Handler =================
app.use((err, req, res, next) => {
  console.error("Server Error:", err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong on the server."
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
