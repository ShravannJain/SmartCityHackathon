import { Progress } from "@/components/ui/progress";

interface ScoreDisplayProps {
  innovationScore?: number;
  feasibilityScore?: number;
  totalScore?: number;
  maxScore?: number;
}

export function ScoreDisplay({
  innovationScore,
  feasibilityScore,
  totalScore,
  maxScore = 100,
}: ScoreDisplayProps) {
  const getScoreColor = (score: number) => {
    if (score >= 71) return "text-green-600";
    if (score >= 41) return "text-amber-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-3">
      {innovationScore !== undefined && (
        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Innovation</span>
            <span className={`font-medium ${getScoreColor(innovationScore)}`}>
              {innovationScore}/{maxScore}
            </span>
          </div>
          <Progress value={innovationScore} className="h-2" />
        </div>
      )}
      {feasibilityScore !== undefined && (
        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Feasibility</span>
            <span className={`font-medium ${getScoreColor(feasibilityScore)}`}>
              {feasibilityScore}/{maxScore}
            </span>
          </div>
          <Progress value={feasibilityScore} className="h-2" />
        </div>
      )}
      {totalScore !== undefined && (
        <div className="pt-2 border-t">
          <div className="flex justify-between items-baseline">
            <span className="text-sm font-medium">Total Score</span>
            <span className={`text-2xl font-bold ${getScoreColor(totalScore)}`}>
              {totalScore}
              <span className="text-sm text-muted-foreground">/{maxScore}</span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
