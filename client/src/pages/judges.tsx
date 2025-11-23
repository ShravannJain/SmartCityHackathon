import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function JudgesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const judges = [
    {
      judgeName: "Dr. Emily Carter",
      expertise: "AI & Machine Learning",
      organization: "Tech University",
      evaluationCount: 12,
    },
    {
      judgeName: "Prof. James Liu",
      expertise: "Urban Planning",
      organization: "City Planning Institute",
      evaluationCount: 8,
    },
    {
      judgeName: "Maria Santos",
      expertise: "Environmental Engineering",
      organization: "Green Solutions Corp",
      evaluationCount: 10,
    },
    {
      judgeName: "Robert Zhang",
      expertise: "Transportation Systems",
      organization: "Transit Innovation Lab",
      evaluationCount: 6,
    },
  ];

  const filteredJudges = judges.filter((judge) =>
    judge.judgeName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Judges</h1>
          <p className="text-muted-foreground mt-1">Expert evaluators for submissions</p>
        </div>
        <Button data-testid="button-add-judge">
          <Plus className="h-4 w-4 mr-2" />
          Add Judge
        </Button>
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

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredJudges.map((judge) => (
          <Card key={judge.judgeName} className="hover-elevate">
            <CardHeader>
              <div className="flex items-start gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-accent text-accent-foreground">
                    {judge.judgeName.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="text-lg">{judge.judgeName}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">{judge.organization}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <Badge variant="outline">{judge.expertise}</Badge>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Evaluations</span>
                <span className="font-medium">{judge.evaluationCount}</span>
              </div>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => console.log(`View ${judge.judgeName}`)}
                data-testid={`button-view-judge-${judge.judgeName}`}
              >
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredJudges.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No judges found</p>
        </div>
      )}
    </div>
  );
}
