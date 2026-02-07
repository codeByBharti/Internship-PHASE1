require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");



const PORT = process.env.PORT || 5000;

connectDB();
app.use("/api", require("./routes/pressure"));

app.use("/api", require("./routes/hotspot"));

app.use("/api/ambulances", require("./routes/ambulanceRoutes"));





app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
