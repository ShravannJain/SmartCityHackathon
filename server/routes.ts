import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertTeamSchema, 
  insertCompanySchema, 
  insertProblemSchema,
  insertJudgeSchema,
  insertSubmissionSchema,
  insertEvaluationSchema
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Teams routes
  app.get("/api/teams", async (_req, res) => {
    try {
      const teams = await storage.getAllTeams();
      res.json(teams);
    } catch (error: any) {
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
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/teams", async (req, res) => {
    try {
      const data = insertTeamSchema.parse(req.body);
      const team = await storage.createTeam(data);
      res.status(201).json(team);
    } catch (error: any) {
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
    } catch (error: any) {
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
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Companies routes
  app.get("/api/companies", async (_req, res) => {
    try {
      const companies = await storage.getAllCompanies();
      res.json(companies);
    } catch (error: any) {
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
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/companies", async (req, res) => {
    try {
      const data = insertCompanySchema.parse(req.body);
      const company = await storage.createCompany(data);
      res.status(201).json(company);
    } catch (error: any) {
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
    } catch (error: any) {
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
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Problems routes
  app.get("/api/problems", async (_req, res) => {
    try {
      const problems = await storage.getAllProblems();
      res.json(problems);
    } catch (error: any) {
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
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/companies/:companyId/problems", async (req, res) => {
    try {
      const problems = await storage.getProblemsByCompany(req.params.companyId);
      res.json(problems);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/problems", async (req, res) => {
    try {
      const data = insertProblemSchema.parse(req.body);
      const problem = await storage.createProblem(data);
      res.status(201).json(problem);
    } catch (error: any) {
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
    } catch (error: any) {
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
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Judges routes
  app.get("/api/judges", async (_req, res) => {
    try {
      const judges = await storage.getAllJudges();
      res.json(judges);
    } catch (error: any) {
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
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/judges", async (req, res) => {
    try {
      const data = insertJudgeSchema.parse(req.body);
      const judge = await storage.createJudge(data);
      res.status(201).json(judge);
    } catch (error: any) {
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
    } catch (error: any) {
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
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Submissions routes
  app.get("/api/submissions", async (_req, res) => {
    try {
      const submissions = await storage.getAllSubmissions();
      res.json(submissions);
    } catch (error: any) {
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
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/teams/:teamId/submissions", async (req, res) => {
    try {
      const submissions = await storage.getSubmissionsByTeam(req.params.teamId);
      res.json(submissions);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/problems/:problemId/submissions", async (req, res) => {
    try {
      const submissions = await storage.getSubmissionsByProblem(req.params.problemId);
      res.json(submissions);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/submissions", async (req, res) => {
    try {
      const data = insertSubmissionSchema.parse(req.body);
      const submission = await storage.createSubmission(data);
      res.status(201).json(submission);
    } catch (error: any) {
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
    } catch (error: any) {
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
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Evaluations routes
  app.get("/api/evaluations/submission/:submissionId", async (req, res) => {
    try {
      const evaluations = await storage.getEvaluationsBySubmission(req.params.submissionId);
      res.json(evaluations);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/evaluations/judge/:judgeId", async (req, res) => {
    try {
      const evaluations = await storage.getEvaluationsByJudge(req.params.judgeId);
      res.json(evaluations);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/evaluations", async (req, res) => {
    try {
      const data = insertEvaluationSchema.parse(req.body);
      const evaluation = await storage.createEvaluation(data);
      res.status(201).json(evaluation);
    } catch (error: any) {
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
    } catch (error: any) {
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
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
