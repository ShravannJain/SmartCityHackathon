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
    <Card className="hover-elevate">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-primary text-primary-foreground">
                {teamName.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{teamName}</CardTitle>
              <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                <Users className="h-3 w-3" />
                <span>{memberCount} members</span>
              </div>
            </div>
          </div>
          {awardType && (
            <Badge variant="secondary" className="shrink-0">{awardType}</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Mail className="h-3 w-3" />
          <span className="truncate">{contactEmail}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <FileCheck className="h-3 w-3" />
            <span>{submissionCount} submissions</span>
          </div>
          {averageScore !== undefined && (
            <span className="font-medium">Avg: {averageScore}/100</span>
          )}
        </div>
        <Button
          variant="outline"
          className="w-full"
          onClick={onViewDetails}
          data-testid={`button-view-team-${teamName}`}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}
