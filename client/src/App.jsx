import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function App() {
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [previousAnalyses, setPreviousAnalyses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchPreviousAnalyses = async () => {
    try {
      const response = await fetch(`${API_URL}/api/analyses`);
      const data = await response.json();

      if (response.ok) {
        setPreviousAnalyses(data);
      }
    } catch (error) {
      console.error("Failed to fetch previous analyses:", error);
    }
  };

  useEffect(() => {
    fetchPreviousAnalyses();
  }, []);

  const analyzeJob = async () => {
    if (!jobTitle.trim() || !jobDescription.trim()) {
      setError("Please enter both the job title and job description.");
      return;
    }

    setLoading(true);
    setError("");
    setAnalysis("");

    try {
      const response = await fetch(`${API_URL}/api/analyses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobTitle,
          jobDescription,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setAnalysis(data.analysis.analysis);
      fetchPreviousAnalyses();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const clearForm = () => {
    setJobTitle("");
    setJobDescription("");
    setAnalysis("");
    setError("");
  };

  return (
    <div className="app">
      <div className="background-glow glow-one"></div>
      <div className="background-glow glow-two"></div>

      <div className="container">

        {/* Navbar */}
        <nav className="navbar">
          <div className="brand">
            <div className="brand-icon">✦</div>
            <span>JobLens AI</span>
          </div>

          <div className="ai-status">
            <span className="status-dot"></span>
            AI Powered
          </div>
        </nav>

        {/* Hero */}
        <section className="hero">
          <div className="hero-badge">
            ✨ Intelligent Job Analysis
          </div>

          <h1>
            Understand Any Job
            <span> With AI</span>
          </h1>

          <p>
            Paste a job description and instantly discover the skills,
            responsibilities, keywords, and requirements recruiters are
            looking for.
          </p>
        </section>

        {/* Analyzer */}
        <section className="analyzer-card">

          <div className="card-heading">
            <div>
              <h2>Analyze Job Description</h2>
              <p>
                Enter the job details below to get an AI-powered analysis.
              </p>
            </div>

            <div className="sparkle-icon">✦</div>
          </div>

          {/* Job Title */}
          <div className="form-group">
            <label>Job Title</label>

            <input
              type="text"
              placeholder="e.g. Java Developer"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />
          </div>

          {/* Job Description */}
          <div className="form-group">
            <div className="label-row">
              <label>Job Description</label>
              <span>{jobDescription.length} characters</span>
            </div>

            <textarea
              placeholder="Paste the complete job description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              rows="10"
            />
          </div>

          {error && (
            <div className="error-message">
              ⚠️ {error}
            </div>
          )}

          {/* Buttons */}
          <div className="button-row">
            <button
              className="analyze-button"
              onClick={analyzeJob}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Analyzing with AI...
                </>
              ) : (
                <>
                  ✨ Analyze with AI
                  <span className="arrow">→</span>
                </>
              )}
            </button>

            <button
              className="clear-button"
              onClick={clearForm}
              disabled={loading}
            >
              Clear
            </button>
          </div>
        </section>

        {/* AI Analysis */}
        {analysis && (
          <section className="analysis-card">

            <div className="analysis-header">
              <div className="analysis-title">
                <div className="ai-icon">✦</div>

                <div>
                  <h2>AI Analysis</h2>
                  <p>Generated insights for {jobTitle}</p>
                </div>
              </div>

              <div className="generated-badge">
                ● Generated
              </div>
            </div>

            <div className="analysis-content">
              <ReactMarkdown>{analysis}</ReactMarkdown>
            </div>
          </section>
        )}

        {/* Previous Analyses */}
        <section className="history-section">

          <div className="section-heading">
            <div>
              <h2>Previous Analyses</h2>
              <p>Your recently analyzed job descriptions.</p>
            </div>

            <div className="count-badge">
              {previousAnalyses.length}
            </div>
          </div>

          {previousAnalyses.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">◌</div>
              <h3>No analyses yet</h3>
              <p>
                Your analyzed job descriptions will appear here.
              </p>
            </div>
          ) : (
            <div className="history-list">

              {previousAnalyses.map((item) => (
                <div className="history-card" key={item._id}>

                  <div className="history-top">
                    <div className="history-icon">
                      {item.jobTitle.charAt(0).toUpperCase()}
                    </div>

                    <div className="history-info">
                      <h3>{item.jobTitle}</h3>

                      <p>
                        {new Date(item.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <details className="analysis-details">
                    <summary>View full analysis</summary>

                    <div className="analysis-content history-analysis">
                      <ReactMarkdown
                        components={{
                          h1: ({ children }) => <h3>{children}</h3>,
                          h2: ({ children }) => <h3>{children}</h3>,
                          h3: ({ children }) => <h3>{children}</h3>,
                          ul: ({ children }) => <ul>{children}</ul>,
                          li: ({ children }) => <li>{children}</li>,
                        }}
                      >
                        {item.analysis}
                      </ReactMarkdown>
                    </div>
                  </details>

                </div>
              ))}

            </div>
          )}
        </section>

        {/* Footer */}
        <footer>
          <p>
            Built with React • Node.js • MongoDB • Gemini AI
          </p>
        </footer>

      </div>
    </div>
  );
}

export default App;