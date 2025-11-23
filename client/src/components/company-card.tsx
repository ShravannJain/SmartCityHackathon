import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Building2, User, FileQuestion } from "lucide-react";

interface CompanyCardProps {
  companyName: string;
  industry: string;
  contactPerson: string;
  problemCount?: number;
  teamCount?: number;
  onViewDetails?: () => void;
}

export function CompanyCard({
  companyName,
  industry,
  contactPerson,
  problemCount = 0,
  teamCount = 0,
  onViewDetails,
}: CompanyCardProps) {
  return (
    <Card className="hover-elevate">
      <CardHeader>
        <div className="flex items-start gap-3">
          <Avatar className="h-12 w-12">
            <AvatarFallback className="bg-secondary text-secondary-foreground">
              {companyName.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <CardTitle className="text-lg">{companyName}</CardTitle>
            <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
              <Building2 className="h-3 w-3" />
              <span>{industry}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <User className="h-3 w-3" />
          <span>{contactPerson}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <FileQuestion className="h-3 w-3" />
            <span>{problemCount} problems</span>
          </div>
          <span className="font-medium">{teamCount} teams working</span>
        </div>
        <Button
          variant="outline"
          className="w-full"
          onClick={onViewDetails}
          data-testid={`button-view-company-${companyName}`}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}
