// server/index-prod.ts
import fs from "node:fs";
import path from "node:path";
import express2 from "express";

// server/app.ts
import dotenv from "dotenv";
import express from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage-memory.ts
import { randomUUID } from "crypto";
var MemStorage = class {
  teams;
  companies;
  problems;
  judges;
  submissions;
  evaluations;
  constructor() {
    this.teams = /* @__PURE__ */ new Map();
    this.companies = /* @__PURE__ */ new Map();
    this.problems = /* @__PURE__ */ new Map();
    this.judges = /* @__PURE__ */ new Map();
    this.submissions = /* @__PURE__ */ new Map();
    this.evaluations = /* @__PURE__ */ new Map();
  }
  // Teams
  async getTeam(id) {
    return this.teams.get(id);
  }
  async getAllTeams() {
    return Array.from(this.teams.values());
  }
  async createTeam(insertTeam) {
    const id = randomUUID();
    const team = { ...insertTeam, id };
    this.teams.set(id, team);
    return team;
  }
  async updateTeam(id, updateData) {
    const team = this.teams.get(id);
    if (!team) return void 0;
    const updatedTeam = { ...team, ...updateData };
    this.teams.set(id, updatedTeam);
    return updatedTeam;
  }
  async deleteTeam(id) {
    return this.teams.delete(id);
  }
  // Companies
  async getCompany(id) {
    return this.companies.get(id);
  }
  async getAllCompanies() {
    return Array.from(this.companies.values());
  }
  async createCompany(insertCompany) {
    const id = randomUUID();
    const company = { ...insertCompany, id };
    this.companies.set(id, company);
    return company;
  }
  async updateCompany(id, updateData) {
    const company = this.companies.get(id);
    if (!company) return void 0;
    const updatedCompany = { ...company, ...updateData };
    this.companies.set(id, updatedCompany);
    return updatedCompany;
  }
  async deleteCompany(id) {
    return this.companies.delete(id);
  }
  // Problems
  async getProblem(id) {
    return this.problems.get(id);
  }
  async getAllProblems() {
    return Array.from(this.problems.values());
  }
  async getProblemsByCompany(companyId) {
    return Array.from(this.problems.values()).filter((p) => p.companyId === companyId);
  }
  async createProblem(insertProblem) {
    const id = randomUUID();
    const problem = { ...insertProblem, id };
    this.problems.set(id, problem);
    return problem;
  }
  async updateProblem(id, updateData) {
    const problem = this.problems.get(id);
    if (!problem) return void 0;
    const updatedProblem = { ...problem, ...updateData };
    this.problems.set(id, updatedProblem);
    return updatedProblem;
  }
  async deleteProblem(id) {
    return this.problems.delete(id);
  }
  // Judges
  async getJudge(id) {
    return this.judges.get(id);
  }
  async getAllJudges() {
    return Array.from(this.judges.values());
  }
  async createJudge(insertJudge) {
    const id = randomUUID();
    const judge = { ...insertJudge, id };
    this.judges.set(id, judge);
    return judge;
  }
  async updateJudge(id, updateData) {
    const judge = this.judges.get(id);
    if (!judge) return void 0;
    const updatedJudge = { ...judge, ...updateData };
    this.judges.set(id, updatedJudge);
    return updatedJudge;
  }
  async deleteJudge(id) {
    return this.judges.delete(id);
  }
  // Submissions
  async getSubmission(id) {
    return this.submissions.get(id);
  }
  async getAllSubmissions() {
    return Array.from(this.submissions.values());
  }
  async getSubmissionsByTeam(teamId) {
    return Array.from(this.submissions.values()).filter((s) => s.teamId === teamId);
  }
  async getSubmissionsByProblem(problemId) {
    return Array.from(this.submissions.values()).filter((s) => s.problemId === problemId);
  }
  async createSubmission(insertSubmission) {
    const id = randomUUID();
    const submission = {
      ...insertSubmission,
      id,
      status: insertSubmission.status || "submitted",
      innovationScore: insertSubmission.innovationScore ?? null,
      feasibilityScore: insertSubmission.feasibilityScore ?? null,
      totalScore: insertSubmission.totalScore ?? null,
      awardType: insertSubmission.awardType ?? null,
      submittedAt: /* @__PURE__ */ new Date()
    };
    this.submissions.set(id, submission);
    return submission;
  }
  async updateSubmission(id, updateData) {
    const submission = this.submissions.get(id);
    if (!submission) return void 0;
    const updatedSubmission = { ...submission, ...updateData };
    this.submissions.set(id, updatedSubmission);
    return updatedSubmission;
  }
  async deleteSubmission(id) {
    return this.submissions.delete(id);
  }
  // Evaluations
  async getEvaluation(id) {
    return this.evaluations.get(id);
  }
  async getEvaluationsBySubmission(submissionId) {
    return Array.from(this.evaluations.values()).filter((e) => e.submissionId === submissionId);
  }
  async getEvaluationsByJudge(judgeId) {
    return Array.from(this.evaluations.values()).filter((e) => e.judgeId === judgeId);
  }
  async createEvaluation(insertEvaluation) {
    const id = randomUUID();
    const evaluation = {
      ...insertEvaluation,
      id,
      comments: insertEvaluation.comments ?? null,
      evaluatedAt: /* @__PURE__ */ new Date()
    };
    this.evaluations.set(id, evaluation);
    return evaluation;
  }
  async updateEvaluation(id, updateData) {
    const evaluation = this.evaluations.get(id);
    if (!evaluation) return void 0;
    const updatedEvaluation = { ...evaluation, ...updateData };
    this.evaluations.set(id, updatedEvaluation);
    return updatedEvaluation;
  }
  async deleteEvaluation(id) {
    return this.evaluations.delete(id);
  }
};

// server/models.ts
import mongoose, { Schema } from "mongoose";
var teamSchema = new Schema({
  teamName: { type: String, required: true },
  memberCount: { type: Number, required: true },
  contactEmail: { type: String, required: true }
});
var TeamModel = mongoose.model("Team", teamSchema);
var companySchema = new Schema({
  companyName: { type: String, required: true, unique: true },
  industry: { type: String, required: true },
  contactPerson: { type: String, required: true }
});
var CompanyModel = mongoose.model("Company", companySchema);
var problemSchema = new Schema({
  problemTitle: { type: String, required: true },
  companyId: { type: String, required: true, ref: "Company" },
  category: { type: String, required: true },
  difficulty: { type: String, required: true },
  description: { type: String, required: true }
});
var ProblemModel = mongoose.model("Problem", problemSchema);
var judgeSchema = new Schema({
  judgeName: { type: String, required: true },
  expertise: { type: String, required: true },
  organization: { type: String, required: true }
});
var JudgeModel = mongoose.model("Judge", judgeSchema);
var submissionSchema = new Schema({
  teamId: { type: String, required: true, ref: "Team" },
  problemId: { type: String, required: true, ref: "Problem" },
  solutionTitle: { type: String, required: true },
  solutionDescription: { type: String, required: true },
  innovationScore: { type: Number },
  feasibilityScore: { type: Number },
  totalScore: { type: Number },
  awardType: { type: String },
  status: { type: String, required: true, default: "submitted" },
  submittedAt: { type: Date, default: Date.now }
});
var SubmissionModel = mongoose.model("Submission", submissionSchema);
var evaluationSchema = new Schema({
  submissionId: { type: String, required: true, ref: "Submission" },
  judgeId: { type: String, required: true, ref: "Judge" },
  innovationScore: { type: Number, required: true },
  feasibilityScore: { type: Number, required: true },
  comments: { type: String },
  evaluatedAt: { type: Date, default: Date.now }
});
var EvaluationModel = mongoose.model("Evaluation", evaluationSchema);

// server/storage-mongodb.ts
var MongoStorage = class {
  // Teams
  async getTeam(id) {
    const team = await TeamModel.findById(id);
    return team ? this.teamToPlain(team) : void 0;
  }
  async getAllTeams() {
    const teams2 = await TeamModel.find();
    return teams2.map(this.teamToPlain);
  }
  async createTeam(insertTeam) {
    const team = new TeamModel(insertTeam);
    await team.save();
    return this.teamToPlain(team);
  }
  async updateTeam(id, updateData) {
    const team = await TeamModel.findByIdAndUpdate(id, updateData, { new: true });
    return team ? this.teamToPlain(team) : void 0;
  }
  async deleteTeam(id) {
    const result = await TeamModel.findByIdAndDelete(id);
    return result !== null;
  }
  // Companies
  async getCompany(id) {
    const company = await CompanyModel.findById(id);
    return company ? this.companyToPlain(company) : void 0;
  }
  async getAllCompanies() {
    const companies2 = await CompanyModel.find();
    return companies2.map(this.companyToPlain);
  }
  async createCompany(insertCompany) {
    const company = new CompanyModel(insertCompany);
    await company.save();
    return this.companyToPlain(company);
  }
  async updateCompany(id, updateData) {
    const company = await CompanyModel.findByIdAndUpdate(id, updateData, { new: true });
    return company ? this.companyToPlain(company) : void 0;
  }
  async deleteCompany(id) {
    const result = await CompanyModel.findByIdAndDelete(id);
    return result !== null;
  }
  // Problems
  async getProblem(id) {
    const problem = await ProblemModel.findById(id);
    return problem ? this.problemToPlain(problem) : void 0;
  }
  async getAllProblems() {
    const problems2 = await ProblemModel.find();
    return problems2.map(this.problemToPlain);
  }
  async getProblemsByCompany(companyId) {
    const problems2 = await ProblemModel.find({ companyId });
    return problems2.map(this.problemToPlain);
  }
  async createProblem(insertProblem) {
    const problem = new ProblemModel(insertProblem);
    await problem.save();
    return this.problemToPlain(problem);
  }
  async updateProblem(id, updateData) {
    const problem = await ProblemModel.findByIdAndUpdate(id, updateData, { new: true });
    return problem ? this.problemToPlain(problem) : void 0;
  }
  async deleteProblem(id) {
    const result = await ProblemModel.findByIdAndDelete(id);
    return result !== null;
  }
  // Judges
  async getJudge(id) {
    const judge = await JudgeModel.findById(id);
    return judge ? this.judgeToPlain(judge) : void 0;
  }
  async getAllJudges() {
    const judges2 = await JudgeModel.find();
    return judges2.map(this.judgeToPlain);
  }
  async createJudge(insertJudge) {
    const judge = new JudgeModel(insertJudge);
    await judge.save();
    return this.judgeToPlain(judge);
  }
  async updateJudge(id, updateData) {
    const judge = await JudgeModel.findByIdAndUpdate(id, updateData, { new: true });
    return judge ? this.judgeToPlain(judge) : void 0;
  }
  async deleteJudge(id) {
    const result = await JudgeModel.findByIdAndDelete(id);
    return result !== null;
  }
  // Submissions
  async getSubmission(id) {
    const submission = await SubmissionModel.findById(id);
    return submission ? this.submissionToPlain(submission) : void 0;
  }
  async getAllSubmissions() {
    const submissions2 = await SubmissionModel.find();
    return submissions2.map(this.submissionToPlain);
  }
  async getSubmissionsByTeam(teamId) {
    const submissions2 = await SubmissionModel.find({ teamId });
    return submissions2.map(this.submissionToPlain);
  }
  async getSubmissionsByProblem(problemId) {
    const submissions2 = await SubmissionModel.find({ problemId });
    return submissions2.map(this.submissionToPlain);
  }
  async createSubmission(insertSubmission) {
    const submission = new SubmissionModel(insertSubmission);
    await submission.save();
    return this.submissionToPlain(submission);
  }
  async updateSubmission(id, updateData) {
    const submission = await SubmissionModel.findByIdAndUpdate(id, updateData, { new: true });
    return submission ? this.submissionToPlain(submission) : void 0;
  }
  async deleteSubmission(id) {
    const result = await SubmissionModel.findByIdAndDelete(id);
    return result !== null;
  }
  // Evaluations
  async getEvaluation(id) {
    const evaluation = await EvaluationModel.findById(id);
    return evaluation ? this.evaluationToPlain(evaluation) : void 0;
  }
  async getEvaluationsBySubmission(submissionId) {
    const evaluations2 = await EvaluationModel.find({ submissionId });
    return evaluations2.map(this.evaluationToPlain);
  }
  async getEvaluationsByJudge(judgeId) {
    const evaluations2 = await EvaluationModel.find({ judgeId });
    return evaluations2.map(this.evaluationToPlain);
  }
  async createEvaluation(insertEvaluation) {
    const evaluation = new EvaluationModel(insertEvaluation);
    await evaluation.save();
    return this.evaluationToPlain(evaluation);
  }
  async updateEvaluation(id, updateData) {
    const evaluation = await EvaluationModel.findByIdAndUpdate(id, updateData, { new: true });
    return evaluation ? this.evaluationToPlain(evaluation) : void 0;
  }
  async deleteEvaluation(id) {
    const result = await EvaluationModel.findByIdAndDelete(id);
    return result !== null;
  }
  // Helper methods to convert Mongoose documents to plain objects
  teamToPlain(doc) {
    return {
      id: doc._id.toString(),
      teamName: doc.teamName,
      memberCount: doc.memberCount,
      contactEmail: doc.contactEmail
    };
  }
  companyToPlain(doc) {
    return {
      id: doc._id.toString(),
      companyName: doc.companyName,
      industry: doc.industry,
      contactPerson: doc.contactPerson
    };
  }
  problemToPlain(doc) {
    return {
      id: doc._id.toString(),
      problemTitle: doc.problemTitle,
      companyId: doc.companyId,
      category: doc.category,
      difficulty: doc.difficulty,
      description: doc.description
    };
  }
  judgeToPlain(doc) {
    return {
      id: doc._id.toString(),
      judgeName: doc.judgeName,
      expertise: doc.expertise,
      organization: doc.organization
    };
  }
  submissionToPlain(doc) {
    return {
      id: doc._id.toString(),
      teamId: doc.teamId,
      problemId: doc.problemId,
      solutionTitle: doc.solutionTitle,
      solutionDescription: doc.solutionDescription,
      innovationScore: doc.innovationScore ?? null,
      feasibilityScore: doc.feasibilityScore ?? null,
      totalScore: doc.totalScore ?? null,
      awardType: doc.awardType ?? null,
      status: doc.status,
      submittedAt: doc.submittedAt
    };
  }
  evaluationToPlain(doc) {
    return {
      id: doc._id.toString(),
      submissionId: doc.submissionId,
      judgeId: doc.judgeId,
      innovationScore: doc.innovationScore,
      feasibilityScore: doc.feasibilityScore,
      comments: doc.comments ?? null,
      evaluatedAt: doc.evaluatedAt
    };
  }
};

// server/storage.ts
import mongoose2 from "mongoose";
function getStorage() {
  if (mongoose2.connection.readyState === 1) {
    return new MongoStorage();
  }
  return new MemStorage();
}
var storage = getStorage();

// shared/schema.ts
import { pgTable, text, varchar, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { sql } from "drizzle-orm";
var teams = pgTable("teams", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  teamName: text("team_name").notNull(),
  memberCount: integer("member_count").notNull(),
  contactEmail: text("contact_email").notNull()
});
var companies = pgTable("companies", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  companyName: text("company_name").notNull().unique(),
  industry: text("industry").notNull(),
  contactPerson: text("contact_person").notNull()
});
var problems = pgTable("problems", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  problemTitle: text("problem_title").notNull(),
  companyId: varchar("company_id").notNull().references(() => companies.id),
  category: text("category").notNull(),
  difficulty: text("difficulty").notNull(),
  description: text("description").notNull()
});
var judges = pgTable("judges", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  judgeName: text("judge_name").notNull(),
  expertise: text("expertise").notNull(),
  organization: text("organization").notNull()
});
var submissions = pgTable("submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  teamId: varchar("team_id").notNull().references(() => teams.id),
  problemId: varchar("problem_id").notNull().references(() => problems.id),
  solutionTitle: text("solution_title").notNull(),
  solutionDescription: text("solution_description").notNull(),
  innovationScore: integer("innovation_score"),
  feasibilityScore: integer("feasibility_score"),
  totalScore: integer("total_score"),
  awardType: text("award_type"),
  status: text("status").notNull().default("submitted"),
  submittedAt: timestamp("submitted_at").notNull().defaultNow()
});
var evaluations = pgTable("evaluations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  submissionId: varchar("submission_id").notNull().references(() => submissions.id),
  judgeId: varchar("judge_id").notNull().references(() => judges.id),
  innovationScore: integer("innovation_score").notNull(),
  feasibilityScore: integer("feasibility_score").notNull(),
  comments: text("comments"),
  evaluatedAt: timestamp("evaluated_at").notNull().defaultNow()
});
var insertTeamSchema = createInsertSchema(teams).omit({ id: true });
var insertCompanySchema = createInsertSchema(companies).omit({ id: true });
var insertProblemSchema = createInsertSchema(problems).omit({ id: true });
var insertJudgeSchema = createInsertSchema(judges).omit({ id: true });
var insertSubmissionSchema = createInsertSchema(submissions).omit({ id: true, submittedAt: true });
var insertEvaluationSchema = createInsertSchema(evaluations).omit({ id: true, evaluatedAt: true });

// server/routes.ts
async function registerRoutes(app2) {
  app2.get("/api/teams", async (_req, res) => {
    try {
      const teams2 = await storage.getAllTeams();
      res.json(teams2);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  app2.get("/api/teams/:id", async (req, res) => {
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
  app2.post("/api/teams", async (req, res) => {
    try {
      const data = insertTeamSchema.parse(req.body);
      const team = await storage.createTeam(data);
      res.status(201).json(team);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  app2.put("/api/teams/:id", async (req, res) => {
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
  app2.delete("/api/teams/:id", async (req, res) => {
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
  app2.get("/api/companies", async (_req, res) => {
    try {
      const companies2 = await storage.getAllCompanies();
      res.json(companies2);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  app2.get("/api/companies/:id", async (req, res) => {
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
  app2.post("/api/companies", async (req, res) => {
    try {
      const data = insertCompanySchema.parse(req.body);
      const company = await storage.createCompany(data);
      res.status(201).json(company);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  app2.put("/api/companies/:id", async (req, res) => {
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
  app2.delete("/api/companies/:id", async (req, res) => {
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
  app2.get("/api/problems", async (_req, res) => {
    try {
      const problems2 = await storage.getAllProblems();
      res.json(problems2);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  app2.get("/api/problems/:id", async (req, res) => {
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
  app2.get("/api/companies/:companyId/problems", async (req, res) => {
    try {
      const problems2 = await storage.getProblemsByCompany(req.params.companyId);
      res.json(problems2);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  app2.post("/api/problems", async (req, res) => {
    try {
      const data = insertProblemSchema.parse(req.body);
      const problem = await storage.createProblem(data);
      res.status(201).json(problem);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  app2.put("/api/problems/:id", async (req, res) => {
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
  app2.delete("/api/problems/:id", async (req, res) => {
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
  app2.get("/api/judges", async (_req, res) => {
    try {
      const judges2 = await storage.getAllJudges();
      res.json(judges2);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  app2.get("/api/judges/:id", async (req, res) => {
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
  app2.post("/api/judges", async (req, res) => {
    try {
      const data = insertJudgeSchema.parse(req.body);
      const judge = await storage.createJudge(data);
      res.status(201).json(judge);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  app2.put("/api/judges/:id", async (req, res) => {
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
  app2.delete("/api/judges/:id", async (req, res) => {
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
  app2.get("/api/submissions", async (_req, res) => {
    try {
      const submissions2 = await storage.getAllSubmissions();
      res.json(submissions2);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  app2.get("/api/submissions/:id", async (req, res) => {
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
  app2.get("/api/teams/:teamId/submissions", async (req, res) => {
    try {
      const submissions2 = await storage.getSubmissionsByTeam(req.params.teamId);
      res.json(submissions2);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  app2.get("/api/problems/:problemId/submissions", async (req, res) => {
    try {
      const submissions2 = await storage.getSubmissionsByProblem(req.params.problemId);
      res.json(submissions2);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  app2.post("/api/submissions", async (req, res) => {
    try {
      const data = insertSubmissionSchema.parse(req.body);
      const submission = await storage.createSubmission(data);
      res.status(201).json(submission);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  app2.put("/api/submissions/:id", async (req, res) => {
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
  app2.delete("/api/submissions/:id", async (req, res) => {
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
  app2.get("/api/evaluations/submission/:submissionId", async (req, res) => {
    try {
      const evaluations2 = await storage.getEvaluationsBySubmission(req.params.submissionId);
      res.json(evaluations2);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  app2.get("/api/evaluations/judge/:judgeId", async (req, res) => {
    try {
      const evaluations2 = await storage.getEvaluationsByJudge(req.params.judgeId);
      res.json(evaluations2);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  app2.post("/api/evaluations", async (req, res) => {
    try {
      const data = insertEvaluationSchema.parse(req.body);
      const evaluation = await storage.createEvaluation(data);
      res.status(201).json(evaluation);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  app2.put("/api/evaluations/:id", async (req, res) => {
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
  app2.delete("/api/evaluations/:id", async (req, res) => {
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
  const httpServer = createServer(app2);
  return httpServer;
}

// server/db.ts
import mongoose3 from "mongoose";
async function connectDB() {
  try {
    if (!process.env.MONGO_URI) {
      console.log("\u26A0\uFE0F  No MONGO_URI found, skipping MongoDB connection");
      return false;
    }
    const conn = await mongoose3.connect(process.env.MONGO_URI);
    console.log(`\u2705 MongoDB connected: ${conn.connection.host}`);
    return true;
  } catch (err) {
    console.error("\u26A0\uFE0F  DB Connection Failed:", err.message);
    console.log("\u{1F4DD} Using in-memory storage instead");
    return false;
  }
}

// server/app.ts
dotenv.config();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
var app = express();
app.use(express.json({
  verify: (req, _res, buf) => {
    req.rawBody = buf;
  }
}));
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path2 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path2.startsWith("/api")) {
      let logLine = `${req.method} ${path2} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
async function runApp(setup) {
  const isConnected = await connectDB();
  if (!isConnected) {
    log("Running with in-memory storage", "mongodb");
  }
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  await setup(app, server);
  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
}

// server/index-prod.ts
async function serveStatic(app2, _server) {
  const distPath = path.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express2.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
(async () => {
  await runApp(serveStatic);
})();
export {
  serveStatic
};
