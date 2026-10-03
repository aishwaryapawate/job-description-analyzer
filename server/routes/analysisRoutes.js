const express = require("express");
const {
  analyzeJobDescription,
} = require("../controllers/analysisController");

const Analysis = require("../models/Analysis");

const router = express.Router();

// Analyze a job description using AI
router.post("/", analyzeJobDescription);

// Get previous analyses
router.get("/", async (req, res) => {
  try {
    const analyses = await Analysis.find().sort({ createdAt: -1 });

    res.status(200).json(analyses);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch analyses",
    });
  }
});

module.exports = router;