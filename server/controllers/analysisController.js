const { GoogleGenAI } = require("@google/genai");
const Analysis = require("../models/Analysis");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const analyzeJobDescription = async (req, res) => {
  try {
    const { jobTitle, jobDescription } = req.body;

    if (!jobTitle || !jobDescription) {
      return res.status(400).json({
        message: "Job title and job description are required",
      });
    }

    const prompt = `
You are an AI-powered Job Description Analyzer.

Analyze this job description.

Job Title:
${jobTitle}

Job Description:
${jobDescription}

Provide the analysis using these sections:

1. Required Skills
2. Technical Skills
3. Soft Skills
4. Experience Requirements
5. Key Responsibilities
6. Important Keywords
7. Short Summary

Keep the answer simple, structured, and useful for a job seeker.
`;

    console.log("Sending request to Gemini AI...");

    const interaction = await ai.interactions.create({
      model: "gemini-3.8-flash",
      input: prompt,
    });

    console.log("Gemini response received.");

    const analysisText = interaction.output_text;

    if (!analysisText) {
      throw new Error("Gemini returned an empty response");
    }

    console.log("Saving analysis to MongoDB...");

    const savedAnalysis = await Analysis.create({
      jobTitle,
      jobDescription,
      analysis: analysisText,
    });

    console.log("Analysis saved successfully.");

    res.status(201).json({
      message: "Job description analyzed successfully",
      analysis: savedAnalysis,
    });
  } catch (error) {
    console.error("=================================");
    console.error("AI ANALYSIS ERROR");
    console.error("Message:", error?.message);
    console.error("Name:", error?.name);
    console.error("=================================");

    res.status(500).json({
      message: "Failed to analyze job description",
      error: error?.message || "Unknown server error",
    });
  }
};

module.exports = {
  analyzeJobDescription,
};