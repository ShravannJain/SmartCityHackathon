import { pgTable, text, varchar, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { sql } from "drizzle-orm";

export const teams = pgTable("teams", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  teamName: text("team_name").notNull(),
  memberCount: integer("member_count").notNull(),
  contactEmail: text("contact_email").notNull(),
});

export const companies = pgTable("companies", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  companyName: text("company_name").notNull().unique(),
  industry: text("industry").notNull(),
  contactPerson: text("contact_person").notNull(),
});

export const problems = pgTable("problems", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  problemTitle: text("problem_title").notNull(),
  companyId: varchar("company_id").notNull().references(() => companies.id),
  category: text("category").notNull(),
  difficulty: text("difficulty").notNull(),
  description: text("description").notNull(),
});

export const judges = pgTable("judges", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  judgeName: text("judge_name").notNull(),
  expertise: text("expertise").notNull(),
  organization: text("organization").notNull(),
});

export const submissions = pgTable("submissions", {
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
  submittedAt: timestamp("submitted_at").notNull().defaultNow(),
});

export const evaluations = pgTable("evaluations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  submissionId: varchar("submission_id").notNull().references(() => submissions.id),
  judgeId: varchar("judge_id").notNull().references(() => judges.id),
  innovationScore: integer("innovation_score").notNull(),
  feasibilityScore: integer("feasibility_score").notNull(),
  comments: text("comments"),
  evaluatedAt: timestamp("evaluated_at").notNull().defaultNow(),
});

export const insertTeamSchema = createInsertSchema(teams).omit({ id: true });
export const insertCompanySchema = createInsertSchema(companies).omit({ id: true });
export const insertProblemSchema = createInsertSchema(problems).omit({ id: true });
export const insertJudgeSchema = createInsertSchema(judges).omit({ id: true });
export const insertSubmissionSchema = createInsertSchema(submissions).omit({ id: true, submittedAt: true });
export const insertEvaluationSchema = createInsertSchema(evaluations).omit({ id: true, evaluatedAt: true });

export type Team = typeof teams.$inferSelect;
export type InsertTeam = z.infer<typeof insertTeamSchema>;
export type Company = typeof companies.$inferSelect;
export type InsertCompany = z.infer<typeof insertCompanySchema>;
export type Problem = typeof problems.$inferSelect;
export type InsertProblem = z.infer<typeof insertProblemSchema>;
export type Judge = typeof judges.$inferSelect;
export type InsertJudge = z.infer<typeof insertJudgeSchema>;
export type Submission = typeof submissions.$inferSelect;
export type InsertSubmission = z.infer<typeof insertSubmissionSchema>;
export type Evaluation = typeof evaluations.$inferSelect;
export type InsertEvaluation = z.infer<typeof insertEvaluationSchema>;
