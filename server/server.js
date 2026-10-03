const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const analysisRoutes = require("./routes/analysisRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/analyses", analysisRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Job Description Analyzer API is running!");
});

const PORT = process.env.PORT || 5000;

console.log("Testing MongoDB connection...");
console.log("MONGO_URI exists:", !!process.env.MONGO_URI);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully!");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed!");
    console.error(error.message);
  });