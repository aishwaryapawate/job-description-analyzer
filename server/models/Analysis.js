const mongoose = require("mongoose");

const analysisSchema = new mongoose.Schema(
  {
    jobTitle: {
      type: String,
      required: true,
    },

    jobDescription: {
      type: String,
      required: true,
    },

    analysis: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Analysis", analysisSchema);