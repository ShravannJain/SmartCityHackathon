import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users, Mail, FileCheck } from "lucide-react";

interface TeamCardProps {
  teamName: string;
  memberCount: number;
  contactEmail: string;
  submissionCount?: number;
  averageScore?: number;
  awardType?: string;
  onViewDetails?: () => void;
}

export function TeamCard({
  teamName,
  memberCount,
  contactEmail,
  submissionCount = 0,
  averageScore,
  awardType,
  onViewDetails,
}: TeamCardProps) {
  return (
    <Card className="card-hover-effect border-l-4 border-l-primary">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <Avatar className="h-12 w-12 border-2 border-background shadow-sm">
              <AvatarFallback className="bg-gradient-to-br from-primary to-chart-4 text-primary-foreground font-bold">
                {teamName.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg font-bold">{teamName}</CardTitle>
              <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                <Users className="h-3 w-3" />
                <span>{memberCount} members</span>
              </div>
            </div>
          </div>
          {awardType && (
            <Badge variant="secondary" className="shrink-0 bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-yellow-200">
              {awardType}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 p-2 rounded-md">
          <Mail className="h-3 w-3" />
          <span className="truncate">{contactEmail}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <FileCheck className="h-4 w-4 text-primary" />
            <span className="font-medium">{submissionCount} submissions</span>
          </div>
          {averageScore !== undefined && (
            <div className="flex items-center gap-1">
              <span className="text-muted-foreground">Avg:</span>
              <span className="font-bold text-primary">{averageScore}/100</span>
            </div>
          )}
        </div>
        <Button
          variant="outline"
          className="w-full hover:bg-primary hover:text-primary-foreground transition-colors"
          onClick={onViewDetails}
          data-testid={`button-view-team-${teamName}`}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}
