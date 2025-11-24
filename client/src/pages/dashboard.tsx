import { useQuery } from "@tanstack/react-query";
import { StatsCard } from "@/components/stats-card";
import { TeamCard } from "@/components/team-card";
import { SubmissionCard } from "@/components/submission-card";
import { Users, Building2, FileQuestion, FileCheck, Award, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Team = {
  id: string;
  teamName: string;
  memberCount: number;
  contactEmail: string;
};

type Company = {
  id: string;
  companyName: string;
  industry: string;
  contactPerson: string;
};

type Problem = {
  id: string;
  problemTitle: string;
  companyId: string;
  category: string;
  difficulty: string;
  description: string;
};

type Submission = {
  id: string;
  teamId: string;
  problemId: string;
  solutionTitle: string;
  solutionDescription: string;
  innovationScore: number | null;
  feasibilityScore: number | null;
  totalScore: number | null;
  awardType: string | null;
  status: string;
  submittedAt: string;
};

type Judge = {
  id: string;
  judgeName: string;
  expertise: string;
  organization: string;
};

export default function Dashboard() {
  const { data: teams = [] } = useQuery<Team[]>({ queryKey: ["/api/teams"] });
  const { data: companies = [] } = useQuery<Company[]>({ queryKey: ["/api/companies"] });
  const { data: problems = [] } = useQuery<Problem[]>({ queryKey: ["/api/problems"] });
  const { data: submissions = [] } = useQuery<Submission[]>({ queryKey: ["/api/submissions"] });
  const { data: judges = [] } = useQuery<Judge[]>({ queryKey: ["/api/judges"] });

  // Calculate stats from database
  const stats = [
    { 
      title: "Total Teams", 
      value: teams.length, 
      icon: Users, 
      trend: { value: teams.length > 0 ? Math.round(teams.length * 0.25) : 0, isPositive: true } 
    },
    { 
      title: "Companies", 
      value: companies.length, 
      icon: Building2, 
      trend: { value: companies.length > 0 ? Math.round(companies.length * 0.33) : 0, isPositive: true } 
    },
    { 
      title: "Problems", 
      value: problems.length, 
      icon: FileQuestion, 
      trend: { value: problems.length > 0 ? Math.round(problems.length * 0.35) : 0, isPositive: true } 
    },
    { 
      title: "Submissions", 
      value: submissions.length, 
      icon: FileCheck, 
      trend: { value: submissions.length > 0 ? Math.round(submissions.length * 0.17) : 0, isPositive: true } 
    },
  ];

  // Calculate top teams based on submissions
  const teamSubmissionCounts = teams.map(team => {
    const teamSubs = submissions.filter(sub => sub.teamId === team.id);
    const avgScore = teamSubs.length > 0
      ? teamSubs.reduce((acc, sub) => acc + (sub.totalScore || 0), 0) / teamSubs.length
      : 0;
    return {
      ...team,
      submissionCount: teamSubs.length,
      averageScore: Math.round(avgScore),
      awardType: avgScore >= 80 ? "Gold" : avgScore >= 70 ? "Silver" : avgScore >= 60 ? "Bronze" : undefined,
    };
  }).sort((a, b) => b.averageScore - a.averageScore).slice(0, 2);

  // Get recent submissions (sorted by date)
  const recentSubmissions = submissions
    .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
    .slice(0, 3)
    .map(sub => {
      const team = teams.find(t => t.id === sub.teamId);
      const problem = problems.find(p => p.id === sub.problemId);
      return {
        ...sub,
        teamName: team?.teamName || "Unknown Team",
        problemTitle: problem?.problemTitle || "Unknown Problem",
        judgeCount: 0, // This would need evaluations data
      };
    });

  return (
    <div className="space-y-8">
      <div className="animate-fade-in">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-chart-3 to-chart-4 bg-clip-text text-transparent">
          Dashboard
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">Welcome to Smart City Hackathon Platform</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 stagger-animation">
        {stats.map((stat) => (
          <div key={stat.title} className="card-hover-effect">
            <StatsCard {...stat} />
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="gradient-border card-hover-effect animate-slide-in-left">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Top Performing Teams</CardTitle>
              <Award className="h-5 w-5 text-chart-4" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {teamSubmissionCounts.length > 0 ? (
              teamSubmissionCounts.map((team) => (
                <TeamCard
                  key={team.id}
                  {...team}
                  onViewDetails={() => console.log(`View ${team.teamName}`)}
                />
              ))
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">No teams yet</p>
            )}
          </CardContent>
        </Card>

        <Card className="card-hover-effect animate-slide-in-right">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Submissions</CardTitle>
              <TrendingUp className="h-5 w-5 text-chart-3" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentSubmissions.length > 0 ? (
              recentSubmissions.map((submission) => (
                <SubmissionCard
                  key={submission.id}
                  {...submission}
                  onViewDetails={() => console.log(`View ${submission.solutionTitle}`)}
                />
              ))
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">No submissions yet</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
