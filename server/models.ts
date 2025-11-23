import mongoose, { Schema, Document } from "mongoose";

// Team Model
export interface ITeam extends Document {
  teamName: string;
  memberCount: number;
  contactEmail: string;
}

const teamSchema = new Schema<ITeam>({
  teamName: { type: String, required: true },
  memberCount: { type: Number, required: true },
  contactEmail: { type: String, required: true },
});

export const TeamModel = mongoose.model<ITeam>("Team", teamSchema);

// Company Model
export interface ICompany extends Document {
  companyName: string;
  industry: string;
  contactPerson: string;
}

const companySchema = new Schema<ICompany>({
  companyName: { type: String, required: true, unique: true },
  industry: { type: String, required: true },
  contactPerson: { type: String, required: true },
});

export const CompanyModel = mongoose.model<ICompany>("Company", companySchema);

// Problem Model
export interface IProblem extends Document {
  problemTitle: string;
  companyId: string;
  category: string;
  difficulty: string;
  description: string;
}

const problemSchema = new Schema<IProblem>({
  problemTitle: { type: String, required: true },
  companyId: { type: String, required: true, ref: "Company" },
  category: { type: String, required: true },
  difficulty: { type: String, required: true },
  description: { type: String, required: true },
});

export const ProblemModel = mongoose.model<IProblem>("Problem", problemSchema);

// Judge Model
export interface IJudge extends Document {
  judgeName: string;
  expertise: string;
  organization: string;
}

const judgeSchema = new Schema<IJudge>({
  judgeName: { type: String, required: true },
  expertise: { type: String, required: true },
  organization: { type: String, required: true },
});

export const JudgeModel = mongoose.model<IJudge>("Judge", judgeSchema);

// Submission Model
export interface ISubmission extends Document {
  teamId: string;
  problemId: string;
  solutionTitle: string;
  solutionDescription: string;
  innovationScore?: number;
  feasibilityScore?: number;
  totalScore?: number;
  awardType?: string;
  status: string;
  submittedAt: Date;
}

const submissionSchema = new Schema<ISubmission>({
  teamId: { type: String, required: true, ref: "Team" },
  problemId: { type: String, required: true, ref: "Problem" },
  solutionTitle: { type: String, required: true },
  solutionDescription: { type: String, required: true },
  innovationScore: { type: Number },
  feasibilityScore: { type: Number },
  totalScore: { type: Number },
  awardType: { type: String },
  status: { type: String, required: true, default: "submitted" },
  submittedAt: { type: Date, default: Date.now },
});

export const SubmissionModel = mongoose.model<ISubmission>("Submission", submissionSchema);

// Evaluation Model
export interface IEvaluation extends Document {
  submissionId: string;
  judgeId: string;
  innovationScore: number;
  feasibilityScore: number;
  comments?: string;
  evaluatedAt: Date;
}

const evaluationSchema = new Schema<IEvaluation>({
  submissionId: { type: String, required: true, ref: "Submission" },
  judgeId: { type: String, required: true, ref: "Judge" },
  innovationScore: { type: Number, required: true },
  feasibilityScore: { type: Number, required: true },
  comments: { type: String },
  evaluatedAt: { type: Date, default: Date.now },
});

export const EvaluationModel = mongoose.model<IEvaluation>("Evaluation", evaluationSchema);
