require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");

const hospitalRoutes = require("./routes/hospitalRoutes");
const accidentRoutes = require("./routes/accidentRoutes");
const analyticsRoutes = require("./routes/analytics"); // ✅ NEW

const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();

// ================= Existing Routes =================
app.use("/api", require("./routes/pressure"));
app.use("/api", require("./routes/hotspot"));
app.use("/api/ambulances", require("./routes/ambulanceRoutes"));
app.use("/api", require("./routes/alerts"));
app.use("/api", require("./routes/trends"));

app.use("/api/hospitals", hospitalRoutes);
app.use("/api/accidents", accidentRoutes);

// ================= NEW Analytics Route =================
app.use("/api/analytics", analyticsRoutes); // ✅ ADD THIS

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
