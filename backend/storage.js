import mongoose from "mongoose";

// Team Model
const teamSchema = new mongoose.Schema({
  teamName: { type: String, required: true },
  memberCount: { type: Number, required: true },
  contactEmail: { type: String, required: true },
});

const Team = mongoose.model("Team", teamSchema);

// Company Model
const companySchema = new mongoose.Schema({
  companyName: { type: String, required: true, unique: true },
  industry: { type: String, required: true },
  contactPerson: { type: String, required: true },
});

const Company = mongoose.model("Company", companySchema);

// Problem Model
const problemSchema = new mongoose.Schema({
  problemTitle: { type: String, required: true },
  companyId: { type: String, required: true, ref: "Company" },
  category: { type: String, required: true },
  difficulty: { type: String, required: true },
  description: { type: String, required: true },
});

const Problem = mongoose.model("Problem", problemSchema);

// Judge Model
const judgeSchema = new mongoose.Schema({
  judgeName: { type: String, required: true },
  expertise: { type: String, required: true },
  organization: { type: String, required: true },
});

const Judge = mongoose.model("Judge", judgeSchema);

// Submission Model
const submissionSchema = new mongoose.Schema({
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

const Submission = mongoose.model("Submission", submissionSchema);

// Evaluation Model
const evaluationSchema = new mongoose.Schema({
  submissionId: { type: String, required: true, ref: "Submission" },
  judgeId: { type: String, required: true, ref: "Judge" },
  innovationScore: { type: Number, required: true },
  feasibilityScore: { type: Number, required: true },
  comments: { type: String },
  evaluatedAt: { type: Date, default: Date.now },
});

const Evaluation = mongoose.model("Evaluation", evaluationSchema);

// Storage class for MongoDB operations
class MongoStorage {
  // Teams
  async getTeam(id) {
    return await Team.findById(id);
  }

  async getAllTeams() {
    return await Team.find();
  }

  async createTeam(teamData) {
    const team = new Team(teamData);
    return await team.save();
  }

  async updateTeam(id, updateData) {
    return await Team.findByIdAndUpdate(id, updateData, { new: true });
  }

  async deleteTeam(id) {
    const result = await Team.findByIdAndDelete(id);
    return result !== null;
  }

  // Companies
  async getCompany(id) {
    return await Company.findById(id);
  }

  async getAllCompanies() {
    return await Company.find();
  }

  async createCompany(companyData) {
    const company = new Company(companyData);
    return await company.save();
  }

  async updateCompany(id, updateData) {
    return await Company.findByIdAndUpdate(id, updateData, { new: true });
  }

  async deleteCompany(id) {
    const result = await Company.findByIdAndDelete(id);
    return result !== null;
  }

  // Problems
  async getProblem(id) {
    return await Problem.findById(id);
  }

  async getAllProblems() {
    return await Problem.find();
  }

  async getProblemsByCompany(companyId) {
    return await Problem.find({ companyId });
  }

  async createProblem(problemData) {
    const problem = new Problem(problemData);
    return await problem.save();
  }

  async updateProblem(id, updateData) {
    return await Problem.findByIdAndUpdate(id, updateData, { new: true });
  }

  async deleteProblem(id) {
    const result = await Problem.findByIdAndDelete(id);
    return result !== null;
  }

  // Judges
  async getJudge(id) {
    return await Judge.findById(id);
  }

  async getAllJudges() {
    return await Judge.find();
  }

  async createJudge(judgeData) {
    const judge = new Judge(judgeData);
    return await judge.save();
  }

  async updateJudge(id, updateData) {
    return await Judge.findByIdAndUpdate(id, updateData, { new: true });
  }

  async deleteJudge(id) {
    const result = await Judge.findByIdAndDelete(id);
    return result !== null;
  }

  // Submissions
  async getSubmission(id) {
    return await Submission.findById(id);
  }

  async getAllSubmissions() {
    return await Submission.find();
  }

  async getSubmissionsByTeam(teamId) {
    return await Submission.find({ teamId });
  }

  async getSubmissionsByProblem(problemId) {
    return await Submission.find({ problemId });
  }

  async createSubmission(submissionData) {
    const submission = new Submission(submissionData);
    return await submission.save();
  }

  async updateSubmission(id, updateData) {
    return await Submission.findByIdAndUpdate(id, updateData, { new: true });
  }

  async deleteSubmission(id) {
    const result = await Submission.findByIdAndDelete(id);
    return result !== null;
  }

  // Evaluations
  async getEvaluation(id) {
    return await Evaluation.findById(id);
  }

  async getEvaluationsBySubmission(submissionId) {
    return await Evaluation.find({ submissionId });
  }

  async getEvaluationsByJudge(judgeId) {
    return await Evaluation.find({ judgeId });
  }

  async createEvaluation(evaluationData) {
    const evaluation = new Evaluation(evaluationData);
    return await evaluation.save();
  }

  async updateEvaluation(id, updateData) {
    return await Evaluation.findByIdAndUpdate(id, updateData, { new: true });
  }

  async deleteEvaluation(id) {
    const result = await Evaluation.findByIdAndDelete(id);
    return result !== null;
  }
}

export default new MongoStorage();
