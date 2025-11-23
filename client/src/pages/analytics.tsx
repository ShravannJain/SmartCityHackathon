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

export default function AnalyticsPage() {
  const teamsMultipleProblems = [
    { teamName: "Smart Transit Innovators", submissionCount: 3 },
    { teamName: "Urban Safety Network", submissionCount: 3 },
    { teamName: "EcoCity Solutions", submissionCount: 2 },
  ];

  const companiesByTeamCount = [
    { companyName: "City Transit Authority", teamCount: 18, problemCount: 3 },
    { companyName: "Urban Waste Management", teamCount: 15, problemCount: 2 },
    { companyName: "Metro Police Department", teamCount: 12, problemCount: 2 },
  ];

  const activeJudges = [
    { judgeName: "Dr. Emily Carter", evaluationCount: 12 },
    { judgeName: "Maria Santos", evaluationCount: 10 },
    { judgeName: "Prof. James Liu", evaluationCount: 8 },
  ];

  const collaborationWinners = [
    { teamName: "Smart Transit Innovators", awardType: "Collaboration Offer", totalScore: 82 },
    { teamName: "EcoCity Solutions", awardType: "Collaboration Offer", totalScore: 78 },
  ];

  const companyScores = [
    { companyName: "City Transit Authority", avgInnovation: 78 },
    { companyName: "Urban Waste Management", avgInnovation: 82 },
    { companyName: "Metro Police Department", avgInnovation: 75 },
  ];

  const topTeams = [
    { rank: 1, teamName: "Smart Transit Innovators", totalScore: 82, submissions: 3 },
    { rank: 2, teamName: "Traffic Flow Optimizers", totalScore: 79, submissions: 1 },
    { rank: 3, teamName: "EcoCity Solutions", totalScore: 74, submissions: 2 },
  ];

  const unattemptedProblems = [
    { problemTitle: "Solar Panel Monitoring", companyName: "Smart Energy Grid Co", category: "Energy" },
  ];

  const awardDistribution = [
    { name: "Gold", value: 5, color: "#f59e0b" },
    { name: "Silver", value: 8, color: "#94a3b8" },
    { name: "Bronze", value: 12, color: "#cd7f32" },
    { name: "Collaboration", value: 6, color: "#3b82f6" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        <p className="text-muted-foreground mt-1">Comprehensive insights and statistics</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
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
                {teamsMultipleProblems.map((team) => (
                  <TableRow key={team.teamName}>
                    <TableCell className="font-medium">{team.teamName}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant="secondary">{team.submissionCount}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>2. Most Popular Companies</CardTitle>
            <CardDescription>Companies attracting the most teams</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={companiesByTeamCount}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="companyName" angle={-15} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="teamCount" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
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
                {activeJudges.map((judge) => (
                  <TableRow key={judge.judgeName}>
                    <TableCell className="font-medium">{judge.judgeName}</TableCell>
                    <TableCell className="text-right">
                      <Badge>{judge.evaluationCount}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
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
                {collaborationWinners.map((team) => (
                  <TableRow key={team.teamName}>
                    <TableCell className="font-medium">{team.teamName}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant="default">{team.totalScore}/100</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
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
                {companyScores.map((company) => (
                  <TableRow key={company.companyName}>
                    <TableCell className="font-medium">{company.companyName}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant="outline">{company.avgInnovation}/100</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
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
                {topTeams.map((team) => (
                  <TableRow key={team.teamName}>
                    <TableCell>
                      <Badge variant={team.rank === 1 ? "default" : "outline"}>#{team.rank}</Badge>
                    </TableCell>
                    <TableCell className="font-medium">{team.teamName}</TableCell>
                    <TableCell className="text-right">{team.totalScore}/100</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
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
                {unattemptedProblems.map((problem) => (
                  <TableRow key={problem.problemTitle}>
                    <TableCell className="font-medium">{problem.problemTitle}</TableCell>
                    <TableCell>{problem.companyName}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Award Distribution</CardTitle>
            <CardDescription>Overview of awards granted</CardDescription>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
