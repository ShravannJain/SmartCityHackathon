import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

type Submission = {
  id: string;
  solutionTitle: string;
  teamId: string;
  problemId: string;
  status: string;
  submittedAt: string;
};

type Team = {
  id: string;
  teamName: string;
};

type Problem = {
  id: string;
  problemTitle: string;
};

type Evaluation = {
  id: string;
  submissionId: string;
  judgeId: string;
  innovationScore: number;
  feasibilityScore: number;
  totalScore: number;
  awardType?: string;
};

export default function SubmissionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    solutionTitle: "",
    teamId: "",
    problemId: "",
    status: "Submitted",
  });
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: submissions = [], isLoading } = useQuery<Submission[]>({
    queryKey: ["/api/submissions"],
  });

  const { data: teams = [] } = useQuery<Team[]>({
    queryKey: ["/api/teams"],
  });

  const { data: problems = [] } = useQuery<Problem[]>({
    queryKey: ["/api/problems"],
  });

  const { data: evaluations = [] } = useQuery<Evaluation[]>({
    queryKey: ["/api/evaluations"],
  });

  const createSubmissionMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to create submission");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/submissions"] });
      toast({ title: "Success", description: "Submission created successfully!" });
      setIsDialogOpen(false);
      setFormData({ solutionTitle: "", teamId: "", problemId: "", status: "Submitted" });
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const statuses = ["all", ...Array.from(new Set(submissions.map(s => s.status)))];

  const filteredSubmissions = submissions.filter((submission) => {
    const matchesSearch = submission.solutionTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || submission.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getTeamName = (teamId: string) => {
    return teams.find(t => t.id === teamId)?.teamName || "Unknown";
  };

  const getProblemTitle = (problemId: string) => {
    return problems.find(p => p.id === problemId)?.problemTitle || "Unknown";
  };

  const getSubmissionEvaluations = (submissionId: string) => {
    const submissionEvals = evaluations.filter(e => e.submissionId === submissionId);
    if (submissionEvals.length === 0) return null;
    
    const avgInnovation = Math.round(submissionEvals.reduce((sum, e) => sum + e.innovationScore, 0) / submissionEvals.length);
    const avgFeasibility = Math.round(submissionEvals.reduce((sum, e) => sum + e.feasibilityScore, 0) / submissionEvals.length);
    const avgTotal = Math.round(submissionEvals.reduce((sum, e) => sum + e.totalScore, 0) / submissionEvals.length);
    const awardType = submissionEvals.find(e => e.awardType)?.awardType;
    
    return {
      innovationScore: avgInnovation,
      feasibilityScore: avgFeasibility,
      totalScore: avgTotal,
      awardType,
      judgeCount: submissionEvals.length,
    };
  };

  const handleCreateSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    createSubmissionMutation.mutate(formData);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between animate-fade-in">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-chart-4 to-chart-3 bg-clip-text text-transparent">Submissions</h1>
          <p className="text-muted-foreground mt-2 text-lg">Team solutions and evaluations</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button data-testid="button-create-submission">
              <Plus className="h-4 w-4 mr-2" />
              New Submission
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <form onSubmit={handleCreateSubmission}>
              <DialogHeader>
                <DialogTitle>New Submission</DialogTitle>
                <DialogDescription>
                  Submit a solution for evaluation.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="solutionTitle">Solution Title</Label>
                  <Input 
                    id="solutionTitle" 
                    placeholder="Enter solution title" 
                    data-testid="input-solution-title"
                    value={formData.solutionTitle}
                    onChange={(e) => setFormData({ ...formData, solutionTitle: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="teamId">Team</Label>
                  <Select 
                    value={formData.teamId} 
                    onValueChange={(value) => setFormData({ ...formData, teamId: value })}
                    required
                  >
                    <SelectTrigger id="teamId" data-testid="select-team">
                      <SelectValue placeholder="Select a team" />
                    </SelectTrigger>
                    <SelectContent>
                      {teams.map((team) => (
                        <SelectItem key={team.id} value={team.id}>
                          {team.teamName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="problemId">Problem</Label>
                  <Select 
                    value={formData.problemId} 
                    onValueChange={(value) => setFormData({ ...formData, problemId: value })}
                    required
                  >
                    <SelectTrigger id="problemId" data-testid="select-problem">
                      <SelectValue placeholder="Select a problem" />
                    </SelectTrigger>
                    <SelectContent>
                      {problems.map((problem) => (
                        <SelectItem key={problem.id} value={problem.id}>
                          {problem.problemTitle}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select 
                    value={formData.status} 
                    onValueChange={(value) => setFormData({ ...formData, status: value })}
                  >
                    <SelectTrigger id="status" data-testid="select-status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Submitted">Submitted</SelectItem>
                      <SelectItem value="Under Review">Under Review</SelectItem>
                      <SelectItem value="Evaluated">Evaluated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" data-testid="button-submit-submission" disabled={createSubmissionMutation.isPending}>
                  {createSubmissionMutation.isPending ? "Submitting..." : "Submit"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
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

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 stagger-animation">
        {isLoading ? (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">Loading submissions...</p>
          </div>
        ) : filteredSubmissions.length > 0 ? (
          filteredSubmissions.map((submission) => {
            const teamName = getTeamName(submission.teamId);
            const problemTitle = getProblemTitle(submission.problemId);
            const evalData = getSubmissionEvaluations(submission.id);
            
            return (
              <SubmissionCard
                key={submission.id}
                solutionTitle={submission.solutionTitle}
                teamName={teamName}
                problemTitle={problemTitle}
                status={submission.status}
                innovationScore={evalData?.innovationScore}
                feasibilityScore={evalData?.feasibilityScore}
                totalScore={evalData?.totalScore}
                awardType={evalData?.awardType}
                judgeCount={evalData?.judgeCount || 0}
                onViewDetails={() => console.log(`View ${submission.solutionTitle}`)}
              />
            );
          })
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">No submissions found</p>
          </div>
        )}
      </div>
    </div>
  );
}
