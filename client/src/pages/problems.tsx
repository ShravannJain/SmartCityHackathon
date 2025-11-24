import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ProblemCard } from "@/components/problem-card";
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

type Problem = {
  id: string;
  problemTitle: string;
  companyId: string;
  category: string;
  difficulty: string;
  description: string;
};

type Company = {
  id: string;
  companyName: string;
};

type Submission = {
  id: string;
  problemId: string;
  teamId: string;
};

export default function ProblemsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    problemTitle: "",
    companyId: "",
    category: "",
    difficulty: "Medium",
    description: "",
  });
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: problems = [], isLoading } = useQuery<Problem[]>({
    queryKey: ["/api/problems"],
  });

  const { data: companies = [] } = useQuery<Company[]>({
    queryKey: ["/api/companies"],
  });

  const { data: submissions = [] } = useQuery<Submission[]>({
    queryKey: ["/api/submissions"],
  });

  const createProblemMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const res = await fetch("/api/problems", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to create problem");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/problems"] });
      toast({ title: "Success", description: "Problem created successfully!" });
      setIsDialogOpen(false);
      setFormData({ problemTitle: "", companyId: "", category: "", difficulty: "Medium", description: "" });
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const categories = ["all", ...Array.from(new Set(problems.map(p => p.category)))];

  const filteredProblems = problems.filter((problem) => {
    const matchesSearch = problem.problemTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || problem.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const getTeamCount = (problemId: string) => {
    return new Set(submissions.filter(s => s.problemId === problemId).map(s => s.teamId)).size;
  };

  const getCompanyName = (companyId: string) => {
    return companies.find(c => c.id === companyId)?.companyName || "Unknown";
  };

  const handleCreateProblem = (e: React.FormEvent) => {
    e.preventDefault();
    createProblemMutation.mutate(formData);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between animate-fade-in">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-chart-4 bg-clip-text text-transparent">Problem Statements</h1>
          <p className="text-muted-foreground mt-2 text-lg">Challenges for teams to solve</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button data-testid="button-create-problem">
              <Plus className="h-4 w-4 mr-2" />
              Add Problem
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <form onSubmit={handleCreateProblem}>
              <DialogHeader>
                <DialogTitle>Add New Problem</DialogTitle>
                <DialogDescription>
                  Create a new challenge for teams to solve.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="problemTitle">Problem Title</Label>
                  <Input 
                    id="problemTitle" 
                    placeholder="Enter problem title" 
                    data-testid="input-problem-title"
                    value={formData.problemTitle}
                    onChange={(e) => setFormData({ ...formData, problemTitle: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companyId">Company</Label>
                  <Select 
                    value={formData.companyId} 
                    onValueChange={(value) => setFormData({ ...formData, companyId: value })}
                    required
                  >
                    <SelectTrigger id="companyId" data-testid="select-company">
                      <SelectValue placeholder="Select a company" />
                    </SelectTrigger>
                    <SelectContent>
                      {companies.map((company) => (
                        <SelectItem key={company.id} value={company.id}>
                          {company.companyName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Input 
                      id="category" 
                      placeholder="e.g., Waste Management" 
                      data-testid="input-category"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="difficulty">Difficulty</Label>
                    <Select 
                      value={formData.difficulty} 
                      onValueChange={(value) => setFormData({ ...formData, difficulty: value })}
                    >
                      <SelectTrigger id="difficulty" data-testid="select-difficulty">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Easy">Easy</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Describe the problem statement..." 
                    data-testid="textarea-description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" data-testid="button-submit-problem" disabled={createProblemMutation.isPending}>
                  {createProblemMutation.isPending ? "Creating..." : "Add Problem"}
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
            placeholder="Search problems..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
            data-testid="input-search-problems"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-48" data-testid="select-category-filter">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat === "all" ? "All Categories" : cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 stagger-animation">
        {isLoading ? (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">Loading problems...</p>
          </div>
        ) : filteredProblems.length > 0 ? (
          filteredProblems.map((problem) => {
            const teamCount = getTeamCount(problem.id);
            const companyName = getCompanyName(problem.companyId);
            return (
              <ProblemCard
                key={problem.id}
                {...problem}
                companyName={companyName}
                teamCount={teamCount}
                onViewDetails={() => console.log(`View ${problem.problemTitle}`)}
              />
            );
          })
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">No problems found</p>
          </div>
        )}
      </div>
    </div>
  );
}
