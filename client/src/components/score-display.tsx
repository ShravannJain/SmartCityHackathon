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
    if (score >= 80) return "text-green-600 dark:text-green-400";
    if (score >= 60) return "text-amber-600 dark:text-amber-400";
    return "text-red-600 dark:text-red-400";
  };

  const getProgressColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-amber-500";
    return "bg-red-500";
  };

  return (
    <div className="space-y-3">
      {innovationScore !== undefined && (
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-medium">
            <span className="text-muted-foreground">Innovation</span>
            <span className={getScoreColor(innovationScore)}>
              {innovationScore}/{maxScore}
            </span>
          </div>
          <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 ease-out ${getProgressColor(innovationScore)}`} 
              style={{ width: `${(innovationScore / maxScore) * 100}%` }}
            />
          </div>
        </div>
      )}
      {feasibilityScore !== undefined && (
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-medium">
            <span className="text-muted-foreground">Feasibility</span>
            <span className={getScoreColor(feasibilityScore)}>
              {feasibilityScore}/{maxScore}
            </span>
          </div>
          <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 ease-out ${getProgressColor(feasibilityScore)}`} 
              style={{ width: `${(feasibilityScore / maxScore) * 100}%` }}
            />
          </div>
        </div>
      )}
      {totalScore !== undefined && (
        <div className="pt-3 mt-1 border-t border-border/50">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Total Score</span>
            <span className={`text-xl font-black ${getScoreColor(totalScore)}`}>
              {totalScore}
              <span className="text-xs font-normal text-muted-foreground ml-0.5">/{maxScore}</span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
