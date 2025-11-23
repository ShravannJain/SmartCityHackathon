import { StatsCard } from "@/components/stats-card";
import { TeamCard } from "@/components/team-card";
import { SubmissionCard } from "@/components/submission-card";
import { Users, Building2, FileQuestion, FileCheck, Award, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Dashboard() {
  const stats = [
    { title: "Total Teams", value: 48, icon: Users, trend: { value: 12, isPositive: true } },
    { title: "Companies", value: 15, icon: Building2, trend: { value: 5, isPositive: true } },
    { title: "Problems", value: 23, icon: FileQuestion, trend: { value: 8, isPositive: true } },
    { title: "Submissions", value: 142, icon: FileCheck, trend: { value: 24, isPositive: true } },
  ];

  const topTeams = [
    {
      teamName: "Smart Transit Innovators",
      memberCount: 5,
      contactEmail: "team@smarttransit.com",
      submissionCount: 3,
      averageScore: 85,
      awardType: "Gold",
    },
    {
      teamName: "EcoCity Solutions",
      memberCount: 4,
      contactEmail: "contact@ecocity.io",
      submissionCount: 2,
      averageScore: 82,
      awardType: "Silver",
    },
  ];

  const recentSubmissions = [
    {
      solutionTitle: "AI-Powered Route Optimizer",
      teamName: "Smart Transit Innovators",
      problemTitle: "Smart Waste Collection Optimization",
      innovationScore: 85,
      feasibilityScore: 78,
      totalScore: 82,
      awardType: "Collaboration Offer",
      status: "Evaluated",
      judgeCount: 3,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome to Smart City Hackathon Platform</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Top Performing Teams</CardTitle>
              <Award className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {topTeams.map((team) => (
              <TeamCard
                key={team.teamName}
                {...team}
                onViewDetails={() => console.log(`View ${team.teamName}`)}
              />
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Submissions</CardTitle>
              <TrendingUp className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentSubmissions.map((submission) => (
              <SubmissionCard
                key={submission.solutionTitle}
                {...submission}
                onViewDetails={() => console.log(`View ${submission.solutionTitle}`)}
              />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
