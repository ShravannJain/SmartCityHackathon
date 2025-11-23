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
    <Card className="hover-elevate">
      <CardHeader>
        <div className="flex items-start justify-between gap-2 mb-2">
          <Badge variant={getStatusVariant(status)}>{status}</Badge>
          {awardType && <Badge variant="secondary">{awardType}</Badge>}
        </div>
        <CardTitle className="text-lg">{solutionTitle}</CardTitle>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Avatar className="h-5 w-5">
            <AvatarFallback className="text-xs">
              {teamName.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span>{teamName}</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <FileQuestion className="h-3 w-3" />
          <span className="truncate">{problemTitle}</span>
        </div>
        {(innovationScore !== undefined || feasibilityScore !== undefined || totalScore !== undefined) && (
          <ScoreDisplay
            innovationScore={innovationScore}
            feasibilityScore={feasibilityScore}
            totalScore={totalScore}
          />
        )}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Scale className="h-3 w-3" />
          <span>Evaluated by {judgeCount} judges</span>
        </div>
        <Button
          variant="outline"
          className="w-full"
          onClick={onViewDetails}
          data-testid={`button-view-submission-${solutionTitle}`}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}
