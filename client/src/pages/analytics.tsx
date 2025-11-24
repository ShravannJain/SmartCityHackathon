import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

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

type Evaluation = {
  id: string;
  submissionId: string;
  judgeId: string;
  innovationScore: number;
  feasibilityScore: number;
  comments: string | null;
  evaluatedAt: string;
};

export default function AnalyticsPage() {
  const { data: teams = [] } = useQuery<Team[]>({ queryKey: ["/api/teams"] });
  const { data: companies = [] } = useQuery<Company[]>({ queryKey: ["/api/companies"] });
  const { data: problems = [] } = useQuery<Problem[]>({ queryKey: ["/api/problems"] });
  const { data: submissions = [] } = useQuery<Submission[]>({ queryKey: ["/api/submissions"] });
  const { data: judges = [] } = useQuery<Judge[]>({ queryKey: ["/api/judges"] });
  const { data: evaluations = [] } = useQuery<Evaluation[]>({ queryKey: ["/api/evaluations"] });

  // 1. Teams with 2+ submissions
  const teamSubmissionMap = teams.map(team => {
    const teamSubs = submissions.filter(s => s.teamId === team.id);
    return { teamName: team.teamName, submissionCount: teamSubs.length };
  }).filter(t => t.submissionCount >= 2).sort((a, b) => b.submissionCount - a.submissionCount);

  // 2. Companies by team count (teams working on their problems)
  const companiesByTeamCount = companies.map(company => {
    const companyProblems = problems.filter(p => p.companyId === company.id);
    const uniqueTeams = new Set(
      submissions
        .filter(s => companyProblems.some(p => p.id === s.problemId))
        .map(s => s.teamId)
    );
    return {
      companyName: company.companyName,
      teamCount: uniqueTeams.size,
      problemCount: companyProblems.length,
    };
  }).sort((a, b) => b.teamCount - a.teamCount).slice(0, 3);

  // 3. Active judges (now with actual evaluation data)
  const activeJudges = judges.map(judge => ({
    judgeName: judge.judgeName,
    evaluationCount: evaluations.filter(e => e.judgeId === judge.id).length,
  })).filter(j => j.evaluationCount > 0).sort((a, b) => b.evaluationCount - a.evaluationCount).slice(0, 3);

  // 4. Collaboration offer winners
  const collaborationWinners = submissions
    .filter(s => s.awardType && s.awardType.toLowerCase().includes("collaboration"))
    .map(s => {
      const team = teams.find(t => t.id === s.teamId);
      return {
        teamName: team?.teamName || "Unknown",
        awardType: s.awardType,
        totalScore: s.totalScore || 0,
      };
    })
    .sort((a, b) => b.totalScore - a.totalScore);

  // 5. Average innovation score by company
  const companyScores = companies.map(company => {
    const companyProblems = problems.filter(p => p.companyId === company.id);
    const companySubs = submissions.filter(s => 
      companyProblems.some(p => p.id === s.problemId) && s.innovationScore
    );
    const avgInnovation = companySubs.length > 0
      ? Math.round(companySubs.reduce((acc, s) => acc + (s.innovationScore || 0), 0) / companySubs.length)
      : 0;
    return {
      companyName: company.companyName,
      avgInnovation,
    };
  }).filter(c => c.avgInnovation > 0).sort((a, b) => b.avgInnovation - a.avgInnovation).slice(0, 3);

  // 6. Top scoring teams
  const topTeams = teams.map(team => {
    const teamSubs = submissions.filter(s => s.teamId === team.id);
    const avgScore = teamSubs.length > 0
      ? Math.round(teamSubs.reduce((acc, s) => acc + (s.totalScore || 0), 0) / teamSubs.length)
      : 0;
    return {
      teamName: team.teamName,
      totalScore: avgScore,
      submissions: teamSubs.length,
    };
  })
    .filter(t => t.totalScore > 0)
    .sort((a, b) => b.totalScore - a.totalScore)
    .slice(0, 3)
    .map((team, index) => ({ ...team, rank: index + 1 }));

  // 7. Unattempted problems
  const unattemptedProblems = problems.filter(problem => {
    const hasSubs = submissions.some(s => s.problemId === problem.id);
    return !hasSubs;
  }).map(problem => {
    const company = companies.find(c => c.id === problem.companyId);
    return {
      problemTitle: problem.problemTitle,
      companyName: company?.companyName || "Unknown",
      category: problem.category,
    };
  });

  // 8. Award distribution
  const awardCounts = {
    Gold: submissions.filter(s => s.awardType?.toLowerCase() === "gold").length,
    Silver: submissions.filter(s => s.awardType?.toLowerCase() === "silver").length,
    Bronze: submissions.filter(s => s.awardType?.toLowerCase() === "bronze").length,
    Collaboration: submissions.filter(s => s.awardType?.toLowerCase().includes("collaboration")).length,
  };

  const awardDistribution = [
    { name: "Gold", value: awardCounts.Gold, color: "#f59e0b" },
    { name: "Silver", value: awardCounts.Silver, color: "#94a3b8" },
    { name: "Bronze", value: awardCounts.Bronze, color: "#cd7f32" },
    { name: "Collaboration", value: awardCounts.Collaboration, color: "#3b82f6" },
  ].filter(a => a.value > 0);

  return (
    <div className="space-y-8">
      <div className="animate-fade-in">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-chart-1 via-chart-3 to-chart-4 bg-clip-text text-transparent">
          Analytics Dashboard
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">Comprehensive insights and statistics</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 stagger-animation">
        <Card className="card-hover-effect">
          <CardHeader>
            <CardTitle>1. Teams with 2+ Submissions</CardTitle>
            <CardDescription>Active teams working on multiple problems</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Team Name</TableHead>
                  <TableHead className="text-right">Submissions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teamSubmissionMap.length > 0 ? (
                  teamSubmissionMap.map((team) => (
                    <TableRow key={team.teamName}>
                      <TableCell className="font-medium">{team.teamName}</TableCell>
                      <TableCell className="text-right">
                        <Badge variant="secondary">{team.submissionCount}</Badge>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={2} className="text-center text-muted-foreground">
                      No teams with multiple submissions yet
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="card-hover-effect">
          <CardHeader>
            <CardTitle>2. Most Popular Companies</CardTitle>
            <CardDescription>Companies attracting the most teams</CardDescription>
          </CardHeader>
          <CardContent>
            {companiesByTeamCount.length > 0 ? (
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={companiesByTeamCount}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="companyName" angle={-15} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="teamCount" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[200px] flex items-center justify-center">
                <p className="text-sm text-muted-foreground">No company data available</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="card-hover-effect">
          <CardHeader>
            <CardTitle>3. Active Judges</CardTitle>
            <CardDescription>Judges who evaluated multiple projects</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Judge Name</TableHead>
                  <TableHead className="text-right">Evaluations</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activeJudges.length > 0 ? (
                  activeJudges.map((judge) => (
                    <TableRow key={judge.judgeName}>
                      <TableCell className="font-medium">{judge.judgeName}</TableCell>
                      <TableCell className="text-right">
                        <Badge>{judge.evaluationCount}</Badge>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={2} className="text-center text-muted-foreground">
                      No judge evaluations available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="card-hover-effect">
          <CardHeader>
            <CardTitle>4. Collaboration Offer Winners</CardTitle>
            <CardDescription>Teams receiving collaboration opportunities</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Team Name</TableHead>
                  <TableHead className="text-right">Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {collaborationWinners.length > 0 ? (
                  collaborationWinners.map((team) => (
                    <TableRow key={team.teamName}>
                      <TableCell className="font-medium">{team.teamName}</TableCell>
                      <TableCell className="text-right">
                        <Badge variant="default">{team.totalScore}/100</Badge>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={2} className="text-center text-muted-foreground">
                      No collaboration winners yet
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="card-hover-effect">
          <CardHeader>
            <CardTitle>5. Average Innovation Score by Company</CardTitle>
            <CardDescription>Company-wise innovation metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead className="text-right">Avg Innovation</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {companyScores.length > 0 ? (
                  companyScores.map((company) => (
                    <TableRow key={company.companyName}>
                      <TableCell className="font-medium">{company.companyName}</TableCell>
                      <TableCell className="text-right">
                        <Badge variant="outline">{company.avgInnovation}/100</Badge>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={2} className="text-center text-muted-foreground">
                      No company innovation scores available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="card-hover-effect">
          <CardHeader>
            <CardTitle>6. Top Scoring Teams</CardTitle>
            <CardDescription>Leaderboard of highest-rated teams</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">Rank</TableHead>
                  <TableHead>Team Name</TableHead>
                  <TableHead className="text-right">Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topTeams.length > 0 ? (
                  topTeams.map((team) => (
                    <TableRow key={team.teamName}>
                      <TableCell>
                        <Badge variant={team.rank === 1 ? "default" : "outline"}>#{team.rank}</Badge>
                      </TableCell>
                      <TableCell className="font-medium">{team.teamName}</TableCell>
                      <TableCell className="text-right">{team.totalScore}/100</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center text-muted-foreground">
                      No team scores available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="card-hover-effect">
          <CardHeader>
            <CardTitle>7. Unattempted Problems</CardTitle>
            <CardDescription>Problem statements with no submissions</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Problem Title</TableHead>
                  <TableHead>Company</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {unattemptedProblems.length > 0 ? (
                  unattemptedProblems.map((problem) => (
                    <TableRow key={problem.problemTitle}>
                      <TableCell className="font-medium">{problem.problemTitle}</TableCell>
                      <TableCell>{problem.companyName}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={2} className="text-center text-muted-foreground">
                      All problems have been attempted
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="card-hover-effect">
          <CardHeader>
            <CardTitle>Award Distribution</CardTitle>
            <CardDescription>Overview of awards granted</CardDescription>
          </CardHeader>
          <CardContent>
            {awardDistribution.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={awardDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {awardDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[250px] flex items-center justify-center">
                <p className="text-sm text-muted-foreground">No award data available</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
