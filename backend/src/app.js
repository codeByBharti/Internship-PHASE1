const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const app = express();

// ================= SECURITY MIDDLEWARE =================

// 1️⃣ Secure HTTP headers
app.use(helmet());

// 2️⃣ Enable CORS (allow frontend only)
app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
    credentials: true,
  })
);

// 3️⃣ Rate limiting (prevent API abuse)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per window
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});

app.use(limiter);

// 4️⃣ Body parser
app.use(express.json());

// ================= HEALTH CHECK =================

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is running successfully",
  });
});

// ================= GLOBAL ERROR HANDLER =================

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

module.exports = app;
