import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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
import { useToast } from "@/hooks/use-toast";

type Judge = {
  id: string;
  judgeName: string;
  expertise: string;
  organization: string;
};

type Evaluation = {
  id: string;
  judgeId: string;
  submissionId: string;
};

export default function JudgesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    judgeName: "",
    expertise: "",
    organization: "",
  });
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: judges = [], isLoading } = useQuery<Judge[]>({
    queryKey: ["/api/judges"],
  });

  const { data: evaluations = [] } = useQuery<Evaluation[]>({
    queryKey: ["/api/evaluations"],
  });

  const createJudgeMutation = useMutation({
    mutationFn: async (data: { judgeName: string; expertise: string; organization: string }) => {
      const res = await fetch("/api/judges", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to create judge");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/judges"] });
      toast({ title: "Success", description: "Judge added successfully!" });
      setIsDialogOpen(false);
      setFormData({ judgeName: "", expertise: "", organization: "" });
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const filteredJudges = judges.filter((judge) =>
    judge.judgeName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getEvaluationCount = (judgeId: string) => {
    return evaluations.filter(e => e.judgeId === judgeId).length;
  };

  const handleCreateJudge = (e: React.FormEvent) => {
    e.preventDefault();
    createJudgeMutation.mutate(formData);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between animate-fade-in">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-chart-5 bg-clip-text text-transparent">Judges</h1>
          <p className="text-muted-foreground mt-2 text-lg">Expert evaluators for submissions</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button data-testid="button-add-judge">
              <Plus className="h-4 w-4 mr-2" />
              Add Judge
            </Button>
          </DialogTrigger>
          <DialogContent>
            <form onSubmit={handleCreateJudge}>
              <DialogHeader>
                <DialogTitle>Add New Judge</DialogTitle>
                <DialogDescription>
                  Register an expert evaluator for the hackathon.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="judgeName">Judge Name</Label>
                  <Input 
                    id="judgeName" 
                    placeholder="Dr. Jane Smith" 
                    data-testid="input-judge-name"
                    value={formData.judgeName}
                    onChange={(e) => setFormData({ ...formData, judgeName: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expertise">Expertise</Label>
                  <Input 
                    id="expertise" 
                    placeholder="e.g., AI & Machine Learning" 
                    data-testid="input-expertise"
                    value={formData.expertise}
                    onChange={(e) => setFormData({ ...formData, expertise: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="organization">Organization</Label>
                  <Input 
                    id="organization" 
                    placeholder="Tech University" 
                    data-testid="input-organization"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" data-testid="button-submit-judge" disabled={createJudgeMutation.isPending}>
                  {createJudgeMutation.isPending ? "Adding..." : "Add Judge"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search judges..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
          data-testid="input-search-judges"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 stagger-animation">
        {isLoading ? (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">Loading judges...</p>
          </div>
        ) : filteredJudges.length > 0 ? (
          filteredJudges.map((judge) => {
            const evaluationCount = getEvaluationCount(judge.id);
            return (
              <Card key={judge.id} className="card-hover-effect border-l-4 border-l-chart-5">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12 border-2 border-background shadow-sm">
                      <AvatarFallback className="bg-gradient-to-br from-chart-5 to-primary text-primary-foreground font-bold">
                        {judge.judgeName.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <CardTitle className="text-lg font-bold">{judge.judgeName}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1 font-medium">{judge.organization}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="bg-chart-5/10 text-chart-5 hover:bg-chart-5/20 border-chart-5/20">
                      {judge.expertise}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm bg-muted/30 p-2 rounded-md">
                    <span className="text-muted-foreground">Evaluations Completed</span>
                    <span className="font-bold text-chart-5">{evaluationCount}</span>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full hover:bg-chart-5 hover:text-white transition-colors"
                    onClick={() => console.log(`View ${judge.judgeName}`)}
                    data-testid={`button-view-judge-${judge.judgeName}`}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">No judges found</p>
          </div>
        )}
      </div>
    </div>
  );
}
