import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import mongoStorage from "./storage.js";
import memStorage from "./mem-storage.js";

dotenv.config(); // Load .env

const app = express();
let storage = memStorage; // Default to in-memory storage

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (req.path.startsWith("/api")) {
      console.log(`${req.method} ${req.path} ${res.statusCode} in ${duration}ms`);
    }
  });
  next();
});

// ==================== Teams Routes ====================
app.get("/api/teams", async (req, res) => {
  try {
    const teams = await storage.getAllTeams();
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/teams/:id", async (req, res) => {
  try {
    const team = await storage.getTeam(req.params.id);
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }
    res.json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/teams", async (req, res) => {
  try {
    const team = await storage.createTeam(req.body);
    res.status(201).json(team);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put("/api/teams/:id", async (req, res) => {
  try {
    const team = await storage.updateTeam(req.params.id, req.body);
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }
    res.json(team);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete("/api/teams/:id", async (req, res) => {
  try {
    const deleted = await storage.deleteTeam(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Team not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ==================== Companies Routes ====================
app.get("/api/companies", async (req, res) => {
  try {
    const companies = await storage.getAllCompanies();
    res.json(companies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/companies/:id", async (req, res) => {
  try {
    const company = await storage.getCompany(req.params.id);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    res.json(company);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/companies", async (req, res) => {
  try {
    const company = await storage.createCompany(req.body);
    res.status(201).json(company);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put("/api/companies/:id", async (req, res) => {
  try {
    const company = await storage.updateCompany(req.params.id, req.body);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    res.json(company);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete("/api/companies/:id", async (req, res) => {
  try {
    const deleted = await storage.deleteCompany(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Company not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ==================== Problems Routes ====================
app.get("/api/problems", async (req, res) => {
  try {
    const problems = await storage.getAllProblems();
    res.json(problems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/problems/:id", async (req, res) => {
  try {
    const problem = await storage.getProblem(req.params.id);
    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }
    res.json(problem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/companies/:companyId/problems", async (req, res) => {
  try {
    const problems = await storage.getProblemsByCompany(req.params.companyId);
    res.json(problems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/problems", async (req, res) => {
  try {
    const problem = await storage.createProblem(req.body);
    res.status(201).json(problem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put("/api/problems/:id", async (req, res) => {
  try {
    const problem = await storage.updateProblem(req.params.id, req.body);
    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }
    res.json(problem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete("/api/problems/:id", async (req, res) => {
  try {
    const deleted = await storage.deleteProblem(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Problem not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ==================== Judges Routes ====================
app.get("/api/judges", async (req, res) => {
  try {
    const judges = await storage.getAllJudges();
    res.json(judges);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/judges/:id", async (req, res) => {
  try {
    const judge = await storage.getJudge(req.params.id);
    if (!judge) {
      return res.status(404).json({ message: "Judge not found" });
    }
    res.json(judge);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/judges", async (req, res) => {
  try {
    const judge = await storage.createJudge(req.body);
    res.status(201).json(judge);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put("/api/judges/:id", async (req, res) => {
  try {
    const judge = await storage.updateJudge(req.params.id, req.body);
    if (!judge) {
      return res.status(404).json({ message: "Judge not found" });
    }
    res.json(judge);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete("/api/judges/:id", async (req, res) => {
  try {
    const deleted = await storage.deleteJudge(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Judge not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ==================== Submissions Routes ====================
app.get("/api/submissions", async (req, res) => {
  try {
    const submissions = await storage.getAllSubmissions();
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/submissions/:id", async (req, res) => {
  try {
    const submission = await storage.getSubmission(req.params.id);
    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }
    res.json(submission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/teams/:teamId/submissions", async (req, res) => {
  try {
    const submissions = await storage.getSubmissionsByTeam(req.params.teamId);
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/problems/:problemId/submissions", async (req, res) => {
  try {
    const submissions = await storage.getSubmissionsByProblem(req.params.problemId);
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/submissions", async (req, res) => {
  try {
    const submission = await storage.createSubmission(req.body);
    res.status(201).json(submission);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put("/api/submissions/:id", async (req, res) => {
  try {
    const submission = await storage.updateSubmission(req.params.id, req.body);
    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }
    res.json(submission);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete("/api/submissions/:id", async (req, res) => {
  try {
    const deleted = await storage.deleteSubmission(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Submission not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ==================== Evaluations Routes ====================
app.get("/api/evaluations/submission/:submissionId", async (req, res) => {
  try {
    const evaluations = await storage.getEvaluationsBySubmission(req.params.submissionId);
    res.json(evaluations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/evaluations/judge/:judgeId", async (req, res) => {
  try {
    const evaluations = await storage.getEvaluationsByJudge(req.params.judgeId);
    res.json(evaluations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/evaluations", async (req, res) => {
  try {
    const evaluations = await storage.getAllEvaluations?.() || [];
    res.json(evaluations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/evaluations", async (req, res) => {
  try {
    const evaluation = await storage.createEvaluation(req.body);
    res.status(201).json(evaluation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put("/api/evaluations/:id", async (req, res) => {
  try {
    const evaluation = await storage.updateEvaluation(req.params.id, req.body);
    if (!evaluation) {
      return res.status(404).json({ message: "Evaluation not found" });
    }
    res.json(evaluation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete("/api/evaluations/:id", async (req, res) => {
  try {
    const deleted = await storage.deleteEvaluation(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Evaluation not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ==================== Analytics/Stats Route ====================
app.get("/api/stats", async (req, res) => {
  try {
    const [teams, companies, problems, submissions, judges] = await Promise.all([
      storage.getAllTeams(),
      storage.getAllCompanies(),
      storage.getAllProblems(),
      storage.getAllSubmissions(),
      storage.getAllJudges(),
    ]);

    const stats = {
      totalTeams: teams.length,
      totalCompanies: companies.length,
      totalProblems: problems.length,
      totalSubmissions: submissions.length,
      totalJudges: judges.length,
      evaluatedSubmissions: submissions.filter(s => s.totalScore !== null).length,
      pendingSubmissions: submissions.filter(s => s.totalScore === null).length,
      averageScore: submissions.length > 0
        ? Math.round(submissions.reduce((acc, s) => acc + (s.totalScore || 0), 0) / submissions.length)
        : 0,
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ==================== Error Handler ====================
app.use((err, req, res, next) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ message });
  console.error(err);
});

// ==================== Start Server ====================
const PORT = process.env.PORT || 5001;

async function startServer() {
  try {
    // Connect to MongoDB first
    console.log("Connecting to MongoDB...");
    console.log("MONGO_URI:", process.env.MONGO_URI ? "Found" : "Not found");
    console.log("PORT:", process.env.PORT);
    const dbConnected = await connectDB();
    console.log("MongoDB connection attempt complete");
    
    if (dbConnected) {
      storage = mongoStorage;
      console.log("✅ Using MongoDB storage");
    } else {
      storage = memStorage;
      console.log("📝 Using in-memory storage");
    }
    
    return new Promise((resolve, reject) => {
      const server = app.listen(PORT, '0.0.0.0', () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
        console.log(`📦 Storage: ${dbConnected ? 'MongoDB' : 'In-Memory'}`);
        resolve(server);
      });
      
      server.on('error', (err) => {
        console.error('❌ Server error:', err);
        reject(err);
      });
    });
  } catch (error) {
    console.error("Error in startServer:", error);
    throw error;
  }
}

console.log("Starting application...");

process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  console.error('Stack:', error.stack);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
});

startServer().catch((error) => {
  console.error("Failed to start server:", error);
  console.error("Stack trace:", error.stack);
  process.exit(1);
});

