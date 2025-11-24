import { 
  type Team, type InsertTeam,
  type Company, type InsertCompany,
  type Problem, type InsertProblem,
  type Judge, type InsertJudge,
  type Submission, type InsertSubmission,
  type Evaluation, type InsertEvaluation
} from "@shared/schema";
import { MemStorage } from "./storage-memory";
import { MongoStorage } from "./storage-mongodb";
import mongoose from "mongoose";

export interface IStorage {
  // Teams
  getTeam(id: string): Promise<Team | undefined>;
  getAllTeams(): Promise<Team[]>;
  createTeam(team: InsertTeam): Promise<Team>;
  updateTeam(id: string, team: Partial<InsertTeam>): Promise<Team | undefined>;
  deleteTeam(id: string): Promise<boolean>;
  
  // Companies
  getCompany(id: string): Promise<Company | undefined>;
  getAllCompanies(): Promise<Company[]>;
  createCompany(company: InsertCompany): Promise<Company>;
  updateCompany(id: string, company: Partial<InsertCompany>): Promise<Company | undefined>;
  deleteCompany(id: string): Promise<boolean>;
  
  // Problems
  getProblem(id: string): Promise<Problem | undefined>;
  getAllProblems(): Promise<Problem[]>;
  getProblemsByCompany(companyId: string): Promise<Problem[]>;
  createProblem(problem: InsertProblem): Promise<Problem>;
  updateProblem(id: string, problem: Partial<InsertProblem>): Promise<Problem | undefined>;
  deleteProblem(id: string): Promise<boolean>;
  
  // Judges
  getJudge(id: string): Promise<Judge | undefined>;
  getAllJudges(): Promise<Judge[]>;
  createJudge(judge: InsertJudge): Promise<Judge>;
  updateJudge(id: string, judge: Partial<InsertJudge>): Promise<Judge | undefined>;
  deleteJudge(id: string): Promise<boolean>;
  
  // Submissions
  getSubmission(id: string): Promise<Submission | undefined>;
  getAllSubmissions(): Promise<Submission[]>;
  getSubmissionsByTeam(teamId: string): Promise<Submission[]>;
  getSubmissionsByProblem(problemId: string): Promise<Submission[]>;
  createSubmission(submission: InsertSubmission): Promise<Submission>;
  updateSubmission(id: string, submission: Partial<InsertSubmission>): Promise<Submission | undefined>;
  deleteSubmission(id: string): Promise<boolean>;
  
  // Evaluations
  getEvaluation(id: string): Promise<Evaluation | undefined>;
  getEvaluationsBySubmission(submissionId: string): Promise<Evaluation[]>;
  getEvaluationsByJudge(judgeId: string): Promise<Evaluation[]>;
  createEvaluation(evaluation: InsertEvaluation): Promise<Evaluation>;
  updateEvaluation(id: string, evaluation: Partial<InsertEvaluation>): Promise<Evaluation | undefined>;
  deleteEvaluation(id: string): Promise<boolean>;
}

// Use MongoDB storage if connected, otherwise fall back to in-memory storage
function getStorage(): IStorage {
  if (mongoose.connection.readyState === 1) {
    return new MongoStorage();
  }
  return new MemStorage();
}

export const storage = getStorage();
