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
    <Card className="card-hover-effect border-t-4 border-t-chart-2">
      <CardHeader>
        <div className="flex items-start gap-4">
          <Avatar className="h-12 w-12 border-2 border-background shadow-sm">
            <AvatarFallback className="bg-gradient-to-br from-chart-2 to-chart-1 text-primary-foreground font-bold">
              {companyName.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <CardTitle className="text-lg font-bold">{companyName}</CardTitle>
            <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
              <Building2 className="h-3 w-3" />
              <span>{industry}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 p-2 rounded-md">
          <User className="h-3 w-3" />
          <span className="truncate">{contactPerson}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <FileQuestion className="h-4 w-4 text-chart-2" />
            <span className="font-medium">{problemCount} problems</span>
          </div>
          <span className="font-medium text-chart-2">{teamCount} teams working</span>
        </div>
        <Button
          variant="outline"
          className="w-full hover:bg-chart-2 hover:text-white transition-colors"
          onClick={onViewDetails}
          data-testid={`button-view-company-${companyName}`}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}
