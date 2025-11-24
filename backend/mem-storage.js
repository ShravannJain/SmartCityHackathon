// In-memory storage fallback when MongoDB is unavailable
class MemStorage {
  constructor() {
    this.teams = [];
    this.companies = [];
    this.problems = [];
    this.judges = [];
    this.submissions = [];
    this.evaluations = [];
  }

  // Teams
  async getAllTeams() { return this.teams; }
  async getTeam(id) { return this.teams.find(t => t.id === id); }
  async createTeam(data) {
    const team = { id: Date.now().toString(), ...data };
    this.teams.push(team);
    return team;
  }
  async updateTeam(id, data) {
    const index = this.teams.findIndex(t => t.id === id);
    if (index === -1) return null;
    this.teams[index] = { ...this.teams[index], ...data };
    return this.teams[index];
  }
  async deleteTeam(id) {
    const index = this.teams.findIndex(t => t.id === id);
    if (index === -1) return false;
    this.teams.splice(index, 1);
    return true;
  }

  // Companies
  async getAllCompanies() { return this.companies; }
  async getCompany(id) { return this.companies.find(c => c.id === id); }
  async createCompany(data) {
    const company = { id: Date.now().toString(), ...data };
    this.companies.push(company);
    return company;
  }
  async updateCompany(id, data) {
    const index = this.companies.findIndex(c => c.id === id);
    if (index === -1) return null;
    this.companies[index] = { ...this.companies[index], ...data };
    return this.companies[index];
  }
  async deleteCompany(id) {
    const index = this.companies.findIndex(c => c.id === id);
    if (index === -1) return false;
    this.companies.splice(index, 1);
    return true;
  }

  // Problems
  async getAllProblems() { return this.problems; }
  async getProblem(id) { return this.problems.find(p => p.id === id); }
  async createProblem(data) {
    const problem = { id: Date.now().toString(), ...data };
    this.problems.push(problem);
    return problem;
  }
  async updateProblem(id, data) {
    const index = this.problems.findIndex(p => p.id === id);
    if (index === -1) return null;
    this.problems[index] = { ...this.problems[index], ...data };
    return this.problems[index];
  }
  async deleteProblem(id) {
    const index = this.problems.findIndex(p => p.id === id);
    if (index === -1) return false;
    this.problems.splice(index, 1);
    return true;
  }

  // Judges
  async getAllJudges() { return this.judges; }
  async getJudge(id) { return this.judges.find(j => j.id === id); }
  async createJudge(data) {
    const judge = { id: Date.now().toString(), ...data };
    this.judges.push(judge);
    return judge;
  }
  async updateJudge(id, data) {
    const index = this.judges.findIndex(j => j.id === id);
    if (index === -1) return null;
    this.judges[index] = { ...this.judges[index], ...data };
    return this.judges[index];
  }
  async deleteJudge(id) {
    const index = this.judges.findIndex(j => j.id === id);
    if (index === -1) return false;
    this.judges.splice(index, 1);
    return true;
  }

  // Submissions
  async getAllSubmissions() { return this.submissions; }
  async getSubmission(id) { return this.submissions.find(s => s.id === id); }
  async createSubmission(data) {
    const submission = { id: Date.now().toString(), submittedAt: new Date().toISOString(), ...data };
    this.submissions.push(submission);
    return submission;
  }
  async updateSubmission(id, data) {
    const index = this.submissions.findIndex(s => s.id === id);
    if (index === -1) return null;
    this.submissions[index] = { ...this.submissions[index], ...data };
    return this.submissions[index];
  }
  async deleteSubmission(id) {
    const index = this.submissions.findIndex(s => s.id === id);
    if (index === -1) return false;
    this.submissions.splice(index, 1);
    return true;
  }

  // Evaluations
  async getAllEvaluations() { return this.evaluations; }
  async getEvaluation(id) { return this.evaluations.find(e => e.id === id); }
  async createEvaluation(data) {
    const evaluation = { id: Date.now().toString(), ...data };
    this.evaluations.push(evaluation);
    return evaluation;
  }
  async updateEvaluation(id, data) {
    const index = this.evaluations.findIndex(e => e.id === id);
    if (index === -1) return null;
    this.evaluations[index] = { ...this.evaluations[index], ...data };
    return this.evaluations[index];
  }
  async deleteEvaluation(id) {
    const index = this.evaluations.findIndex(e => e.id === id);
    if (index === -1) return false;
    this.evaluations.splice(index, 1);
    return true;
  }

  async getAllEvaluations() {
    return this.evaluations;
  }

  async getEvaluationsBySubmission(submissionId) {
    return this.evaluations.filter(e => e.submissionId === submissionId);
  }

  async getEvaluationsByJudge(judgeId) {
    return this.evaluations.filter(e => e.judgeId === judgeId);
  }
}

export default new MemStorage();
