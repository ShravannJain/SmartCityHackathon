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
    <Card className="card-hover-effect group border-r-4 border-r-chart-3">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2 mb-3">
          <Badge variant="outline" className="bg-background/50 backdrop-blur-sm">{category}</Badge>
          <Badge variant={getDifficultyVariant(difficulty)} className="uppercase text-[10px] tracking-wider font-bold">
            {difficulty}
          </Badge>
        </div>
        <CardTitle className="text-lg font-bold group-hover:text-chart-3 transition-colors">
          {problemTitle}
        </CardTitle>
        <CardDescription className="flex items-center gap-2 text-xs font-medium">
          <Building2 className="h-3.5 w-3.5 text-muted-foreground" />
          {companyName}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed bg-muted/30 p-3 rounded-md">
          {description}
        </p>
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4 text-chart-3" />
            <span className="font-medium">{teamCount} teams</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="hover:bg-chart-3 hover:text-white transition-colors"
            onClick={onViewDetails}
            data-testid={`button-view-problem-${problemTitle}`}
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
