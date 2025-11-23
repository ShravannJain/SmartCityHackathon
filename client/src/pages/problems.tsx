import { useState } from "react";
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

export default function ProblemsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const problems = [
    {
      problemTitle: "Smart Waste Collection Optimization",
      companyName: "Urban Waste Management",
      category: "Waste Management",
      difficulty: "Hard",
      description: "Design an AI-powered system to optimize waste collection routes and schedules based on real-time fill levels and traffic patterns.",
      teamCount: 15,
    },
    {
      problemTitle: "Real-time Traffic Flow Analysis",
      companyName: "City Transit Authority",
      category: "Traffic Control",
      difficulty: "Medium",
      description: "Create a dashboard that analyzes traffic patterns in real-time and suggests optimal signal timing adjustments.",
      teamCount: 12,
    },
    {
      problemTitle: "Emergency Response Coordination",
      companyName: "Metro Police Department",
      category: "Public Safety",
      difficulty: "Hard",
      description: "Build a platform that coordinates emergency services across multiple agencies for faster response times.",
      teamCount: 10,
    },
    {
      problemTitle: "Energy Grid Load Balancing",
      companyName: "Smart Energy Grid Co",
      category: "Energy",
      difficulty: "Medium",
      description: "Develop a predictive model for balancing energy loads across the smart grid during peak hours.",
      teamCount: 8,
    },
  ];

  const categories = ["all", ...Array.from(new Set(problems.map(p => p.category)))];

  const filteredProblems = problems.filter((problem) => {
    const matchesSearch = problem.problemTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || problem.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Problem Statements</h1>
          <p className="text-muted-foreground mt-1">Challenges for teams to solve</p>
        </div>
        <Button data-testid="button-create-problem">
          <Plus className="h-4 w-4 mr-2" />
          Add Problem
        </Button>
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

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProblems.map((problem) => (
          <ProblemCard
            key={problem.problemTitle}
            {...problem}
            onViewDetails={() => console.log(`View ${problem.problemTitle}`)}
          />
        ))}
      </div>

      {filteredProblems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No problems found</p>
        </div>
      )}
    </div>
  );
}
