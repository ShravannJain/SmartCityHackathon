import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, Users } from "lucide-react";

interface ProblemCardProps {
  problemTitle: string;
  companyName: string;
  category: string;
  difficulty: string;
  description: string;
  teamCount?: number;
  onViewDetails?: () => void;
}

export function ProblemCard({
  problemTitle,
  companyName,
  category,
  difficulty,
  description,
  teamCount = 0,
  onViewDetails,
}: ProblemCardProps) {
  const getDifficultyVariant = (diff: string) => {
    if (diff.toLowerCase() === "hard") return "destructive";
    if (diff.toLowerCase() === "medium") return "default";
    return "secondary";
  };

  return (
    <Card className="hover-elevate">
      <CardHeader>
        <div className="flex items-start justify-between gap-2 mb-2">
          <Badge variant="outline">{category}</Badge>
          <Badge variant={getDifficultyVariant(difficulty)}>{difficulty}</Badge>
        </div>
        <CardTitle className="text-lg">{problemTitle}</CardTitle>
        <CardDescription className="flex items-center gap-2">
          <Building2 className="h-3 w-3" />
          {companyName}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-3 w-3" />
            <span>{teamCount} teams working on this</span>
          </div>
        </div>
        <Button
          variant="outline"
          className="w-full"
          onClick={onViewDetails}
          data-testid={`button-view-problem-${problemTitle}`}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}
