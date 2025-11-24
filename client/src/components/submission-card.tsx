import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScoreDisplay } from "./score-display";
import { Users, FileQuestion, Scale } from "lucide-react";

interface SubmissionCardProps {
  solutionTitle: string;
  teamName: string;
  problemTitle: string;
  innovationScore?: number;
  feasibilityScore?: number;
  totalScore?: number;
  awardType?: string;
  status: string;
  judgeCount?: number;
  onViewDetails?: () => void;
}

export function SubmissionCard({
  solutionTitle,
  teamName,
  problemTitle,
  innovationScore,
  feasibilityScore,
  totalScore,
  awardType,
  status,
  judgeCount = 0,
  onViewDetails,
}: SubmissionCardProps) {
  const getStatusVariant = (status: string) => {
    if (status.toLowerCase() === "evaluated") return "default";
    if (status.toLowerCase() === "under review") return "secondary";
    return "outline";
  };

  return (
    <Card className="card-hover-effect group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2 mb-3">
          <Badge variant={getStatusVariant(status)} className="uppercase text-[10px] tracking-wider font-bold">
            {status}
          </Badge>
          {awardType && (
            <Badge variant="outline" className="border-yellow-500 text-yellow-600 bg-yellow-50">
              {awardType}
            </Badge>
          )}
        </div>
        <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors line-clamp-1">
          {solutionTitle}
        </CardTitle>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
          <Avatar className="h-5 w-5 border border-border">
            <AvatarFallback className="text-[10px] bg-muted">
              {teamName.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="font-medium">{teamName}</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-2 text-sm text-muted-foreground bg-muted/30 p-2.5 rounded-md">
          <FileQuestion className="h-4 w-4 mt-0.5 shrink-0 text-primary/70" />
          <span className="line-clamp-2 text-xs leading-relaxed">{problemTitle}</span>
        </div>
        
        {(innovationScore !== undefined || feasibilityScore !== undefined || totalScore !== undefined) && (
          <div className="py-1">
            <ScoreDisplay
              innovationScore={innovationScore}
              feasibilityScore={feasibilityScore}
              totalScore={totalScore}
            />
          </div>
        )}
        
        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Scale className="h-3.5 w-3.5" />
            <span>{judgeCount} judges</span>
          </div>
          <Button
            size="sm"
            variant="ghost"
            className="h-8 text-xs hover:bg-primary/10 hover:text-primary"
            onClick={onViewDetails}
            data-testid={`button-view-submission-${solutionTitle}`}
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
