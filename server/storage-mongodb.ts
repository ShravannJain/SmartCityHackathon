import mongoose from "mongoose";
import { 
  type Team, type InsertTeam,
  type Company, type InsertCompany,
  type Problem, type InsertProblem,
  type Judge, type InsertJudge,
  type Submission, type InsertSubmission,
  type Evaluation, type InsertEvaluation
} from "@shared/schema";
import { type IStorage } from "./storage";
import * as models from "./models";

export class MongoStorage implements IStorage {
  // Teams
  async getTeam(id: string): Promise<Team | undefined> {
    const team = await models.TeamModel.findById(id);
    return team ? this.teamToPlain(team) : undefined;
  }

  async getAllTeams(): Promise<Team[]> {
    const teams = await models.TeamModel.find();
    return teams.map(this.teamToPlain);
  }

  async createTeam(insertTeam: InsertTeam): Promise<Team> {
    const team = new models.TeamModel(insertTeam);
    await team.save();
    return this.teamToPlain(team);
  }

  async updateTeam(id: string, updateData: Partial<InsertTeam>): Promise<Team | undefined> {
    const team = await models.TeamModel.findByIdAndUpdate(id, updateData, { new: true });
    return team ? this.teamToPlain(team) : undefined;
  }

  async deleteTeam(id: string): Promise<boolean> {
    const result = await models.TeamModel.findByIdAndDelete(id);
    return result !== null;
  }

  // Companies
  async getCompany(id: string): Promise<Company | undefined> {
    const company = await models.CompanyModel.findById(id);
    return company ? this.companyToPlain(company) : undefined;
  }

  async getAllCompanies(): Promise<Company[]> {
    const companies = await models.CompanyModel.find();
    return companies.map(this.companyToPlain);
  }

  async createCompany(insertCompany: InsertCompany): Promise<Company> {
    const company = new models.CompanyModel(insertCompany);
    await company.save();
    return this.companyToPlain(company);
  }

  async updateCompany(id: string, updateData: Partial<InsertCompany>): Promise<Company | undefined> {
    const company = await models.CompanyModel.findByIdAndUpdate(id, updateData, { new: true });
    return company ? this.companyToPlain(company) : undefined;
  }

  async deleteCompany(id: string): Promise<boolean> {
    const result = await models.CompanyModel.findByIdAndDelete(id);
    return result !== null;
  }

  // Problems
  async getProblem(id: string): Promise<Problem | undefined> {
    const problem = await models.ProblemModel.findById(id);
    return problem ? this.problemToPlain(problem) : undefined;
  }

  async getAllProblems(): Promise<Problem[]> {
    const problems = await models.ProblemModel.find();
    return problems.map(this.problemToPlain);
  }

  async getProblemsByCompany(companyId: string): Promise<Problem[]> {
    const problems = await models.ProblemModel.find({ companyId });
    return problems.map(this.problemToPlain);
  }

  async createProblem(insertProblem: InsertProblem): Promise<Problem> {
    const problem = new models.ProblemModel(insertProblem);
    await problem.save();
    return this.problemToPlain(problem);
  }

  async updateProblem(id: string, updateData: Partial<InsertProblem>): Promise<Problem | undefined> {
    const problem = await models.ProblemModel.findByIdAndUpdate(id, updateData, { new: true });
    return problem ? this.problemToPlain(problem) : undefined;
  }

  async deleteProblem(id: string): Promise<boolean> {
    const result = await models.ProblemModel.findByIdAndDelete(id);
    return result !== null;
  }

  // Judges
  async getJudge(id: string): Promise<Judge | undefined> {
    const judge = await models.JudgeModel.findById(id);
    return judge ? this.judgeToPlain(judge) : undefined;
  }

  async getAllJudges(): Promise<Judge[]> {
    const judges = await models.JudgeModel.find();
    return judges.map(this.judgeToPlain);
  }

  async createJudge(insertJudge: InsertJudge): Promise<Judge> {
    const judge = new models.JudgeModel(insertJudge);
    await judge.save();
    return this.judgeToPlain(judge);
  }

  async updateJudge(id: string, updateData: Partial<InsertJudge>): Promise<Judge | undefined> {
    const judge = await models.JudgeModel.findByIdAndUpdate(id, updateData, { new: true });
    return judge ? this.judgeToPlain(judge) : undefined;
  }

  async deleteJudge(id: string): Promise<boolean> {
    const result = await models.JudgeModel.findByIdAndDelete(id);
    return result !== null;
  }

  // Submissions
  async getSubmission(id: string): Promise<Submission | undefined> {
    const submission = await models.SubmissionModel.findById(id);
    return submission ? this.submissionToPlain(submission) : undefined;
  }

  async getAllSubmissions(): Promise<Submission[]> {
    const submissions = await models.SubmissionModel.find();
    return submissions.map(this.submissionToPlain);
  }

  async getSubmissionsByTeam(teamId: string): Promise<Submission[]> {
    const submissions = await models.SubmissionModel.find({ teamId });
    return submissions.map(this.submissionToPlain);
  }

  async getSubmissionsByProblem(problemId: string): Promise<Submission[]> {
    const submissions = await models.SubmissionModel.find({ problemId });
    return submissions.map(this.submissionToPlain);
  }

  async createSubmission(insertSubmission: InsertSubmission): Promise<Submission> {
    const submission = new models.SubmissionModel(insertSubmission);
    await submission.save();
    return this.submissionToPlain(submission);
  }

  async updateSubmission(id: string, updateData: Partial<InsertSubmission>): Promise<Submission | undefined> {
    const submission = await models.SubmissionModel.findByIdAndUpdate(id, updateData, { new: true });
    return submission ? this.submissionToPlain(submission) : undefined;
  }

  async deleteSubmission(id: string): Promise<boolean> {
    const result = await models.SubmissionModel.findByIdAndDelete(id);
    return result !== null;
  }

  // Evaluations
  async getEvaluation(id: string): Promise<Evaluation | undefined> {
    const evaluation = await models.EvaluationModel.findById(id);
    return evaluation ? this.evaluationToPlain(evaluation) : undefined;
  }

  async getEvaluationsBySubmission(submissionId: string): Promise<Evaluation[]> {
    const evaluations = await models.EvaluationModel.find({ submissionId });
    return evaluations.map(this.evaluationToPlain);
  }

  async getEvaluationsByJudge(judgeId: string): Promise<Evaluation[]> {
    const evaluations = await models.EvaluationModel.find({ judgeId });
    return evaluations.map(this.evaluationToPlain);
  }

  async createEvaluation(insertEvaluation: InsertEvaluation): Promise<Evaluation> {
    const evaluation = new models.EvaluationModel(insertEvaluation);
    await evaluation.save();
    return this.evaluationToPlain(evaluation);
  }

  async updateEvaluation(id: string, updateData: Partial<InsertEvaluation>): Promise<Evaluation | undefined> {
    const evaluation = await models.EvaluationModel.findByIdAndUpdate(id, updateData, { new: true });
    return evaluation ? this.evaluationToPlain(evaluation) : undefined;
  }

  async deleteEvaluation(id: string): Promise<boolean> {
    const result = await models.EvaluationModel.findByIdAndDelete(id);
    return result !== null;
  }

  // Helper methods to convert Mongoose documents to plain objects
  private teamToPlain(doc: any): Team {
    return {
      id: doc._id.toString(),
      teamName: doc.teamName,
      memberCount: doc.memberCount,
      contactEmail: doc.contactEmail,
    };
  }

  private companyToPlain(doc: any): Company {
    return {
      id: doc._id.toString(),
      companyName: doc.companyName,
      industry: doc.industry,
      contactPerson: doc.contactPerson,
    };
  }

  private problemToPlain(doc: any): Problem {
    return {
      id: doc._id.toString(),
      problemTitle: doc.problemTitle,
      companyId: doc.companyId,
      category: doc.category,
      difficulty: doc.difficulty,
      description: doc.description,
    };
  }

  private judgeToPlain(doc: any): Judge {
    return {
      id: doc._id.toString(),
      judgeName: doc.judgeName,
      expertise: doc.expertise,
      organization: doc.organization,
    };
  }

  private submissionToPlain(doc: any): Submission {
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
      submittedAt: doc.submittedAt,
    };
  }

  private evaluationToPlain(doc: any): Evaluation {
    return {
      id: doc._id.toString(),
      submissionId: doc.submissionId,
      judgeId: doc.judgeId,
      innovationScore: doc.innovationScore,
      feasibilityScore: doc.feasibilityScore,
      comments: doc.comments ?? null,
      evaluatedAt: doc.evaluatedAt,
    };
  }
}
