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

    const interaction = await ai.interactions.create({
      model: "gemini-3.8-flash",
      input: prompt,
    });

    const analysisText = interaction.output_text;

    const savedAnalysis = await Analysis.create({
      jobTitle,
      jobDescription,
      analysis: analysisText,
    });

    res.status(201).json({
      message: "Job description analyzed successfully",
      analysis: savedAnalysis,
    });
  } catch (error) {
    console.error("AI analysis error:", error);

    res.status(500).json({
      message: "Failed to analyze job description",
      error: error.message,
    });
  }
};

module.exports = {
  analyzeJobDescription,
};