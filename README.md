# 🤖 JobLens AI — Job Description Analyzer

An AI-powered web application that analyzes job descriptions and extracts important skills, requirements, responsibilities, keywords, and a short summary to help job seekers understand job opportunities quickly.

## 🚀 Live Demo

**Frontend:** https://job-description-analyzer-iqcd.onrender.com

**Backend API:** https://job-description-analyzer-api.onrender.com

## ✨ Features

- 🔍 Analyze job descriptions using AI
- 💼 Enter job title and complete job description
- 🤖 AI-generated job analysis
- 🛠️ Extract required and technical skills
- 🧠 Identify soft skills
- 📋 Extract experience requirements
- 📌 Identify key responsibilities
- 🔑 Extract important keywords
- 📝 Generate a short summary
- 💾 Store analyses in MongoDB
- 📚 View previous analyses
- 📱 Responsive modern interface

## 🧰 Tech Stack

### Frontend
- React.js
- Vite
- React Markdown
- CSS

### Backend
- Node.js
- Express.js
- REST API

### Database
- MongoDB Atlas
- Mongoose

### AI
- Google Gemini
- `@google/genai`
- Gemini 3.8 Flash

### Deployment
- Render
- GitHub

## 🔄 How It Works

```text
User enters Job Title + Job Description
                ↓
        React Frontend
                ↓
       Express REST API
                ↓
          Gemini AI
                ↓
       AI Job Analysis
                ↓
         MongoDB Atlas
                ↓
       Result displayed in UI
```

## 📊 AI Analysis Includes

1. **Required Skills**
2. **Technical Skills**
3. **Soft Skills**
4. **Experience Requirements**
5. **Key Responsibilities**
6. **Important Keywords**
7. **Short Summary**

## 🖥️ Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/aishwaryapawate/job-description-analyzer.git
cd job-description-analyzer
```

### 2. Install backend dependencies

```bash
cd server
npm install
```

Create a `.env` file inside the `server` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
```

### 3. Start the backend

```bash
node server.js
```

The backend will run on:

```text
http://localhost:5000
```

### 4. Install frontend dependencies

Open another terminal:

```bash
cd client
npm install
```

Create a `.env` file inside the `client` folder:

```env
VITE_API_URL=http://localhost:5000
```

### 5. Start the frontend

```bash
npm run dev
```

The frontend will run on the Vite development URL shown in the terminal.

## 🔐 Environment Variables

| Variable | Purpose |
|---|---|
| `MONGO_URI` | MongoDB Atlas connection |
| `GEMINI_API_KEY` | Google Gemini API authentication |
| `VITE_API_URL` | Backend API URL |

**Never commit `.env` files or API keys to GitHub.**

## 📁 Project Structure

```text
job-description-analyzer/
│
├── client/
│   ├── src/
│   │   ├── App.jsx
│   │   └── App.css
│   ├── .env
│   └── package.json
│
├── server/
│   ├── controllers/
│   │   └── analysisController.js
│   ├── models/
│   │   └── Analysis.js
│   ├── routes/
│   │   └── analysisRoutes.js
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── .gitignore
├── README.md
└── package.json
```

## 🧪 Testing

The application was tested for:

- Empty form validation
- AI job description analysis
- Markdown-formatted AI results
- MongoDB data storage
- Previous analysis retrieval
- Frontend-backend communication
- Live Render deployment

## 🤖 AI Development

AI tools were used during development to assist with:

- Understanding implementation requirements
- Debugging development issues
- Improving UI and user experience
- Testing and troubleshooting
- Understanding API integration

The application itself uses **Google Gemini** to analyze job descriptions.

## 🌐 Deployment

The application is deployed using **Render**.

- Frontend → Render Static Site
- Backend → Render Web Service
- Database → MongoDB Atlas
- Source Code → GitHub

## 👩‍💻 Developer

**Aishwarya Pawate**

Computer Engineering Student  
Interested in Java, SQL, Web Development, MERN, and AI.