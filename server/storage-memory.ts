import { 
  type Team, type InsertTeam,
  type Company, type InsertCompany,
  type Problem, type InsertProblem,
  type Judge, type InsertJudge,
  type Submission, type InsertSubmission,
  type Evaluation, type InsertEvaluation
} from "@shared/schema";
import { randomUUID } from "crypto";
import { type IStorage } from "./storage";

export class MemStorage implements IStorage {
  private teams: Map<string, Team>;
  private companies: Map<string, Company>;
  private problems: Map<string, Problem>;
  private judges: Map<string, Judge>;
  private submissions: Map<string, Submission>;
  private evaluations: Map<string, Evaluation>;

  constructor() {
    this.teams = new Map();
    this.companies = new Map();
    this.problems = new Map();
    this.judges = new Map();
    this.submissions = new Map();
    this.evaluations = new Map();
  }

  // Teams
  async getTeam(id: string): Promise<Team | undefined> {
    return this.teams.get(id);
  }

  async getAllTeams(): Promise<Team[]> {
    return Array.from(this.teams.values());
  }

  async createTeam(insertTeam: InsertTeam): Promise<Team> {
    const id = randomUUID();
    const team: Team = { ...insertTeam, id };
    this.teams.set(id, team);
    return team;
  }

  async updateTeam(id: string, updateData: Partial<InsertTeam>): Promise<Team | undefined> {
    const team = this.teams.get(id);
    if (!team) return undefined;
    const updatedTeam = { ...team, ...updateData };
    this.teams.set(id, updatedTeam);
    return updatedTeam;
  }

  async deleteTeam(id: string): Promise<boolean> {
    return this.teams.delete(id);
  }

  // Companies
  async getCompany(id: string): Promise<Company | undefined> {
    return this.companies.get(id);
  }

  async getAllCompanies(): Promise<Company[]> {
    return Array.from(this.companies.values());
  }

  async createCompany(insertCompany: InsertCompany): Promise<Company> {
    const id = randomUUID();
    const company: Company = { ...insertCompany, id };
    this.companies.set(id, company);
    return company;
  }

  async updateCompany(id: string, updateData: Partial<InsertCompany>): Promise<Company | undefined> {
    const company = this.companies.get(id);
    if (!company) return undefined;
    const updatedCompany = { ...company, ...updateData };
    this.companies.set(id, updatedCompany);
    return updatedCompany;
  }

  async deleteCompany(id: string): Promise<boolean> {
    return this.companies.delete(id);
  }

  // Problems
  async getProblem(id: string): Promise<Problem | undefined> {
    return this.problems.get(id);
  }

  async getAllProblems(): Promise<Problem[]> {
    return Array.from(this.problems.values());
  }

  async getProblemsByCompany(companyId: string): Promise<Problem[]> {
    return Array.from(this.problems.values()).filter(p => p.companyId === companyId);
  }

  async createProblem(insertProblem: InsertProblem): Promise<Problem> {
    const id = randomUUID();
    const problem: Problem = { ...insertProblem, id };
    this.problems.set(id, problem);
    return problem;
  }

  async updateProblem(id: string, updateData: Partial<InsertProblem>): Promise<Problem | undefined> {
    const problem = this.problems.get(id);
    if (!problem) return undefined;
    const updatedProblem = { ...problem, ...updateData };
    this.problems.set(id, updatedProblem);
    return updatedProblem;
  }

  async deleteProblem(id: string): Promise<boolean> {
    return this.problems.delete(id);
  }

  // Judges
  async getJudge(id: string): Promise<Judge | undefined> {
    return this.judges.get(id);
  }

  async getAllJudges(): Promise<Judge[]> {
    return Array.from(this.judges.values());
  }

  async createJudge(insertJudge: InsertJudge): Promise<Judge> {
    const id = randomUUID();
    const judge: Judge = { ...insertJudge, id };
    this.judges.set(id, judge);
    return judge;
  }

  async updateJudge(id: string, updateData: Partial<InsertJudge>): Promise<Judge | undefined> {
    const judge = this.judges.get(id);
    if (!judge) return undefined;
    const updatedJudge = { ...judge, ...updateData };
    this.judges.set(id, updatedJudge);
    return updatedJudge;
  }

  async deleteJudge(id: string): Promise<boolean> {
    return this.judges.delete(id);
  }

  // Submissions
  async getSubmission(id: string): Promise<Submission | undefined> {
    return this.submissions.get(id);
  }

  async getAllSubmissions(): Promise<Submission[]> {
    return Array.from(this.submissions.values());
  }

  async getSubmissionsByTeam(teamId: string): Promise<Submission[]> {
    return Array.from(this.submissions.values()).filter(s => s.teamId === teamId);
  }

  async getSubmissionsByProblem(problemId: string): Promise<Submission[]> {
    return Array.from(this.submissions.values()).filter(s => s.problemId === problemId);
  }

  async createSubmission(insertSubmission: InsertSubmission): Promise<Submission> {
    const id = randomUUID();
    const submission: Submission = { 
      ...insertSubmission,
      id,
      status: insertSubmission.status || "submitted",
      innovationScore: insertSubmission.innovationScore ?? null,
      feasibilityScore: insertSubmission.feasibilityScore ?? null,
      totalScore: insertSubmission.totalScore ?? null,
      awardType: insertSubmission.awardType ?? null,
      submittedAt: new Date()
    };
    this.submissions.set(id, submission);
    return submission;
  }

  async updateSubmission(id: string, updateData: Partial<InsertSubmission>): Promise<Submission | undefined> {
    const submission = this.submissions.get(id);
    if (!submission) return undefined;
    const updatedSubmission = { ...submission, ...updateData };
    this.submissions.set(id, updatedSubmission);
    return updatedSubmission;
  }

  async deleteSubmission(id: string): Promise<boolean> {
    return this.submissions.delete(id);
  }

  // Evaluations
  async getEvaluation(id: string): Promise<Evaluation | undefined> {
    return this.evaluations.get(id);
  }

  async getEvaluationsBySubmission(submissionId: string): Promise<Evaluation[]> {
    return Array.from(this.evaluations.values()).filter(e => e.submissionId === submissionId);
  }

  async getEvaluationsByJudge(judgeId: string): Promise<Evaluation[]> {
    return Array.from(this.evaluations.values()).filter(e => e.judgeId === judgeId);
  }

  async createEvaluation(insertEvaluation: InsertEvaluation): Promise<Evaluation> {
    const id = randomUUID();
    const evaluation: Evaluation = { 
      ...insertEvaluation,
      id,
      comments: insertEvaluation.comments ?? null,
      evaluatedAt: new Date()
    };
    this.evaluations.set(id, evaluation);
    return evaluation;
  }

  async updateEvaluation(id: string, updateData: Partial<InsertEvaluation>): Promise<Evaluation | undefined> {
    const evaluation = this.evaluations.get(id);
    if (!evaluation) return undefined;
    const updatedEvaluation = { ...evaluation, ...updateData };
    this.evaluations.set(id, updatedEvaluation);
    return updatedEvaluation;
  }

  async deleteEvaluation(id: string): Promise<boolean> {
    return this.evaluations.delete(id);
  }
}
