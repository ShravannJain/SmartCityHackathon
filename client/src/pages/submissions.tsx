import { useState } from "react";
import { SubmissionCard } from "@/components/submission-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SubmissionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const submissions = [
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
    {
      solutionTitle: "Traffic Signal Intelligence",
      teamName: "Traffic Flow Optimizers",
      problemTitle: "Real-time Traffic Flow Analysis",
      innovationScore: 78,
      feasibilityScore: 80,
      totalScore: 79,
      status: "Evaluated",
      judgeCount: 3,
    },
    {
      solutionTitle: "Unified Emergency Platform",
      teamName: "Urban Safety Network",
      problemTitle: "Emergency Response Coordination",
      status: "Under Review",
      judgeCount: 1,
    },
    {
      solutionTitle: "Green Waste Tracker",
      teamName: "EcoCity Solutions",
      problemTitle: "Smart Waste Collection Optimization",
      innovationScore: 72,
      feasibilityScore: 75,
      totalScore: 74,
      status: "Evaluated",
      judgeCount: 2,
    },
  ];

  const statuses = ["all", ...Array.from(new Set(submissions.map(s => s.status)))];

  const filteredSubmissions = submissions.filter((submission) => {
    const matchesSearch = submission.solutionTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || submission.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Submissions</h1>
          <p className="text-muted-foreground mt-1">Team solutions and evaluations</p>
        </div>
        <Button data-testid="button-create-submission">
          <Plus className="h-4 w-4 mr-2" />
          New Submission
        </Button>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search submissions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
            data-testid="input-search-submissions"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48" data-testid="select-status-filter">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            {statuses.map((status) => (
              <SelectItem key={status} value={status}>
                {status === "all" ? "All Statuses" : status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredSubmissions.map((submission) => (
          <SubmissionCard
            key={submission.solutionTitle}
            {...submission}
            onViewDetails={() => console.log(`View ${submission.solutionTitle}`)}
          />
        ))}
      </div>

      {filteredSubmissions.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No submissions found</p>
        </div>
      )}
    </div>
  );
}
