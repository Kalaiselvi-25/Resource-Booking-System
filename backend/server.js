const express = require("express");
const cors = require("cors");
const db = require("./config/db"); // MySQL connection import

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


// Test DB connection
db.getConnection((err) => {
  if (err) {
    console.log("❌ Database connection failed:", err);
  } else {
    console.log("✅ Database connected successfully");
  }
});

// Test API route
app.get("/", (req, res) => {
  res.send("Backend server is running ✅");
});

const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes);

const resourceRoutes = require("./routes/resourceRoutes");
app.use("/resources", resourceRoutes);

const bookingRoutes = require("./routes/bookingRoutes");
app.use("/bookings", bookingRoutes);

// Start server
app.listen(5000, () => {
  console.log("✅ Server running on http://localhost:5000");
});
